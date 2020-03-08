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
// import SignUp from "./signUp";

const { width, height } = Dimensions.get("window");
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    //1000 because it supposed the animation is supposed tp run for 1s
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position
  ]);
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };

    //Change the opacity of the button when clicked and trigger animations
    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      Extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      // outputRange: [-height / 3, 0],
      outputRange: [-height / 1, 0],

      Extrapolate: Extrapolate.CLAMP
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      Extrapolate: Extrapolate.CLAMP
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      Extrapolate: Extrapolate.CLAMP
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      Extrapolate: Extrapolate.CLAMP
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      Extrapolate: Extrapolate.CLAMP
    });
  }

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
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          // justifyContent: "flex-end"
          justifyContent: "center"
        }}
      >
        {/* absoluteFill so that the background image it takes the entire screen */}
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }]
          }}
        >
          <Image
            source={require("../assets/bg.jpeg")}
            style={{ flex: 1, height: null, width: null }}
          />
        </Animated.View>

        <View style={{ height: height / 1.4 }}>
          {/* This is to make the sign button clickable */}
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Login</Text>
            </Animated.View>
          </TapGestureHandler>

          <Animated.View
            style={{
              ...styles.button,
              backgroundColor: "#2E71DC",
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }]
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              Sign In With Google
            </Text>
          </Animated.View>
          <View>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingTop: 10,
                  color: "white"
                }}
              >
                New Here? Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Animated.View
                style={{
                  height: 300,
                  ...StyleSheet.absoluteFill,
                  // top: null,

                  justifyContent: "center",
                  // zIndex: this.textInputZindex,
                  opacity: this.textInputOpacity
                  // transform: [{ translateY: this.textInputY }]
                }}
              >
                <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                  <Animated.View style={styles.closeButton}>
                    <Animated.Text
                      style={{
                        fontSize: 15,
                        transform: [{ rotate: concat(this.rotateCross, "deg") }]
                      }}
                    >
                      X
                    </Animated.Text>
                  </Animated.View>
                </TapGestureHandler>

                <View>
                  <TextInput
                    placeholder={"Enter Username"}
                    //To get the username being typed
                    onChangeText={value => this.setState({ username: value })}
                    style={{
                      height: 50,
                      width: "90%",
                      borderBottomWidth: 1,
                      marginHorizontal: 20,
                      paddingLeft: 10,
                      marginVertical: 5,
                      shadowOffset: { width: 2, height: 2 }
                    }}
                    placeholderTextColor="black"
                    keyboardType="email-address"
                    //The "next" allows to move to the next text field when done typing
                    returnKeyType="next"
                    autoCorrect={false}
                    onSubmitEditing={() => this.refs.passwordText.focus()}
                  />
                </View>

                <View>
                  <TextInput
                    placeholder={"Enter Password"}
                    //To get the password being typed
                    onChangeText={value => this.setState({ password: value })}
                    style={{
                      height: 50,
                      width: "90%",
                      borderBottomWidth: 1,
                      marginHorizontal: 20,
                      paddingLeft: 10,
                      marginVertical: 5,
                      shadowOffset: { width: 2, height: 2 }
                    }}
                    placeholderTextColor="black"
                    //the "go" key is to close the keyboard when fields are complete
                    returnKeyType="go"
                    secureTextEntry
                    autoCorrect={false}
                    ref={"passwordText"}
                  />
                </View>

                <Animated.View
                  style={{
                    fontSize: 20,
                    fontWeight: "bold"
                  }}
                >
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      height: 50,
                      width: "80%",
                      justifyContent: "center",
                      alignSelf: "center",
                      backgroundColor: "#2E71DC",
                      borderColor: "#2E71DC",
                      borderRadius: 40,
                      marginVertical: 15
                    }}
                    onPress={() => this.login_api_call()}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center"
                      }}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>

                  {/* <Text>{"The username is ==> " + this.state.username}</Text>
                  <Text>{"The password is ==> " + this.state.password}</Text> */}
                </Animated.View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>

          {/* <View>
            <TouchableOpacity onPress={SignUp}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingTop: 10
                }}
              >
                New Here? <Text style={{ color: "white" }}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 5
    marginVertical: 10
  },
  textInput: {
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,

    shadowOffset: { width: 2, height: 2 },
    borderColor: "#F9F6F8",
    shadowOpacity: 0.2,
    backgroundColor: "#F9F6F8"
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: "#F9F6F8",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2
  }
});
