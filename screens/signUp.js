import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  textInput,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  // const ScreenContainer = ({ children }) => (
  //   <View style={styles.container}>{children}</View>
  // );

  validate_field = () => {
    const { username, password } = this.state;
    if (username == "") {
      alert("Please enter the username");
      return false;
    } else if (password == "") {
      alert("Please enter the password");
      return false;
    }
    return true;
  };

  // To make the API call to get login data
  login_api_call = () => {
    if (this.validate_field()) {
      alert("Successful login to Tysk!");
    }
  };
  render() {
    return (
      <View>
        {/* <ScreenContainer> */}
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
            placeholder={"Passwordwe"}
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
        <Button title="Sign Up" onPress={() => signUp()} />
        {/* </ScreenContainer> */}
      </View>
    );
    //   }
  }
}
export default SignUp;
