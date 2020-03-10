// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// //Install expo-asset on command line
// import { Asset } from "expo-asset";
// import { AppLoading } from "expo";
// // import TyskApp from "./src/index";
// import Landing from "./src/landing";
// // import Landing from "./screens/landingScreen";

// import Navigator from "./routes/homeStack";
// import { render } from "react-dom";

// function cacheImages(images) {
//   return images.map(image => {
//     if (typeof image === "string") {
//       return Image.prefetch(image);
//     } else {
//       return Asset.fromModule(image).downloadAsync();
//     }
//   });
// }
// export default class App extends React.Component {
//   constructor() {
//     super();
//     // This initial state is to determine if teh app is ready or not
//     // to display the background image
//     this.state = {
//       isReady: false
//     };
//   }

//   async _loadAssetsAsync() {
//     const imageAssets = cacheImages([require("./assets/bg.jpeg")]);

//     await Promise.all([...imageAssets]);
//   }

//   render() {
//     if (!this.state.isReady) {
//       return (
//         <AppLoading
//           startAsync={this._loadAssetsAsync}
//           onFinish={() => this.setState({ isReady: true })}
//           onError={console.warn}
//         />
//       );
//     }
//     // return <TyskApp />;
//     return <Landing />;
//     // <Navigator />;
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// // //Install expo-asset on command line
// import { Asset } from "expo-asset";
// import { AppLoading } from "expo";
// // import Landing from "./src/landing";
// // // import Landing from "./screens/landingScreen";

// import { Navigator } from "./routes/homeStack";
// import { render } from "react-dom";
// import * as Font from "expo-font";

// const getFonts = () =>
//   Font.loadAsync({
//     "nunito-regular": require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
//     "nunito-bold": require("./assets/fonts/Nunito/Nunito-Bold.ttf")
//   });

// export default function App() {
//   const [fontsLoaded, setFontsLoaded] = useState(false);

//   if (fontsLoaded) {
//     return <Navigator />;
//   } else {
//     return (
//       <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
//     );
//   }
// }

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// import { signIn, CreateAccount } from "./screens/Screens";

// const AuthStack = createStackNavigator();

// export default () => {
//   <NavigationContainer>
//     <AuthStack.Navigator>
//       <AuthStack.Screen name="SignIn" component={signIn} />
//       <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
//     </AuthStack.Navigator>
//   </NavigationContainer>;
// };
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AuthContext } from "./screens/context";
import {
  SignIn,
  CreateAccount,
  Search,
  Home,
  Details,
  Search2,
  Profile,
  Splash
} from "./screens/Screens";

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: "Welcome to Tysk" }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({ route }) => ({
        title: route.params.name
      })}
    />
  </HomeStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
  </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name="Home" component={TabsScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      }
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
