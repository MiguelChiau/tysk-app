import React from "react";
import { StyleSheet, Text, View } from "react-native";

//Install expo-asset on command line
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
// import TyskApp from "./src/index";
import Landing from "./src/landing";

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
export default class App extends React.Component {
  constructor() {
    super();
    // This initial state is to determine if teh app is ready or not
    // to display the background image
    this.state = {
      isReady: false
    };
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require("./assets/bg.jpeg")]);

    await Promise.all([...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    // return <TyskApp />;
    return <Landing />;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
