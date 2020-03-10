import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  textInput,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";

import { AuthContext } from "./context";
import Img from "../assets/bg.jpeg";

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export const Home = ({ navigation }) => (
  <ScreenContainer>
    <Text>Master List Screen</Text>
    <Button
      title="React Native by Example"
      onPress={() =>
        navigation.push("Details", { name: "React Native by Example " })
      }
    />
    <Button
      title="React Native School"
      onPress={() =>
        navigation.push("Details", { name: "React Native School" })
      }
    />
    <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
  </ScreenContainer>
);

export const Details = ({ route }) => (
  <ScreenContainer>
    <Text>Details Screen</Text>
    {route.params.name && <Text>{route.params.name}</Text>}
  </ScreenContainer>
);

export const Search = ({ navigation }) => (
  <ScreenContainer>
    <Text>Search Screen</Text>
    <Button title="Search 2" onPress={() => navigation.push("Search2")} />
    <Button
      title="React Native School"
      onPress={() => {
        navigation.navigate("Home", {
          screen: "Details",
          params: { name: "React Native School" }
        });
      }}
    />
  </ScreenContainer>
);

export const Search2 = () => (
  <ScreenContainer>
    <Text>Search2 Screen</Text>
  </ScreenContainer>
);

export const Profile = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Profile Screen</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};

export const Splash = () => (
  <ScreenContainer>
    <Text>Loading...</Text>
  </ScreenContainer>
);

export const SignIn = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <TouchableOpacity
        style={styles.landingButton1}
        onPress={() => navigation.push("LoginAccount")}
      >
        <Text
          style={{
            color: "#2E71DC",
            textAlign: "center",
            fontSize: 22
          }}
        >
          {" "}
          Login{" "}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.landingButton}
        onPress={() => navigation.push("CreateAccount")}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 22
          }}
        >
          {" "}
          Sign Up{" "}
        </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export const LoginAccount = () => {
  const { signUp } = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text
        style={{
          fontSize: 25,
          color: "#2E71DC"
        }}
      >
        Welcome Back!
      </Text>
      <View
        style={{
          height: 50,
          width: "90%",
          borderBottomWidth: 1,
          marginHorizontal: 20,
          paddingLeft: 10,
          marginVertical: 5,
          shadowOffset: { width: 2, height: 2 }
        }}
      >
        <TextInput
          placeholder={"Email Address"}
          //To get the username being typed
          // onChangeText={value => this.setState({ username: value })}
          placeholderTextColor="black"
          keyboardType="email-address"
          //The "next" allows to move to the next text field when done typing
          returnKeyType="next"
          autoCorrect={false}
          // onSubmitEditing={() => this.refs.passwordText.focus()}
        />
      </View>

      <View
        style={{
          height: 50,
          width: "90%",
          borderBottomWidth: 1,
          marginHorizontal: 20,
          paddingLeft: 10,
          marginVertical: 5,
          shadowOffset: { width: 2, height: 2 }
        }}
      >
        <TextInput
          placeholder={"Password"}
          //To get the password being typed
          // onChangeText={value => this.setState({ password: value })}

          placeholderTextColor="black"
          //the "go" key is to close the keyboard when fields are complete
          returnKeyType="go"
          secureTextEntry
          autoCorrect={false}
          // ref={"passwordText"}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={() => signUp()}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 20
          }}
        >
          {" "}
          Continue{" "}
        </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

export const CreateAccount = () => {
  const { signUp } = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text
        style={{
          fontSize: 25,
          color: "#2E71DC"
        }}
      >
        New Account
      </Text>
      <View
        style={{
          height: 50,
          width: "90%",
          borderBottomWidth: 1,
          marginHorizontal: 20,
          paddingLeft: 10,
          marginVertical: 5,
          shadowOffset: { width: 2, height: 2 }
        }}
      >
        <TextInput
          placeholder={"Name"}
          //To get the username being typed
          // onChangeText={value => this.setState({ username: value })}
          placeholderTextColor="black"
          keyboardType="email-address"
          //The "next" allows to move to the next text field when done typing
          returnKeyType="next"
          autoCorrect={false}
          // onSubmitEditing={() => this.refs.passwordText.focus()}
        />
      </View>
      <View
        style={{
          height: 50,
          width: "90%",
          borderBottomWidth: 1,
          marginHorizontal: 20,
          paddingLeft: 10,
          marginVertical: 5,
          shadowOffset: { width: 2, height: 2 }
        }}
      >
        <TextInput
          placeholder={"Email Address"}
          //To get the username being typed
          // onChangeText={value => this.setState({ username: value })}
          placeholderTextColor="black"
          keyboardType="email-address"
          //The "next" allows to move to the next text field when done typing
          returnKeyType="next"
          autoCorrect={false}
          // onSubmitEditing={() => this.refs.passwordText.focus()}
        />
      </View>

      <View
        style={{
          height: 50,
          width: "90%",
          borderBottomWidth: 1,
          marginHorizontal: 20,
          paddingLeft: 10,
          marginVertical: 5,
          shadowOffset: { width: 2, height: 2 }
        }}
      >
        <TextInput
          placeholder={"Password"}
          //To get the password being typed
          // onChangeText={value => this.setState({ password: value })}

          placeholderTextColor="black"
          //the "go" key is to close the keyboard when fields are complete
          returnKeyType="go"
          secureTextEntry
          autoCorrect={false}
          // ref={"passwordText"}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => signUp()}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 20
          }}
        >
          {" "}
          Sign Up{" "}
        </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  },

  loginButton: {
    borderWidth: 1,
    height: 50,
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#2E71DC",
    borderColor: "#2E71DC",
    borderRadius: 40,
    marginVertical: 15,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },

  landingButton: {
    backgroundColor: "#2E71DC",
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "90%"
  },
  landingButton1: {
    backgroundColor: "white",
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: "90%"
  }
});
