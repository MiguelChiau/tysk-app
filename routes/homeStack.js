//This is the function used to create the stack navigation
import { createStackNavigation } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Landing from "../screens/landingScreen";
import Login from "../screens/loginScreen";
import SignUp from "../screens/signupScreen";
import Home from "../screens/homeScreen";

// To configure the screens
const screens = {
  Landing: {
    screen: Landing
  },
  Login: {
    screen: Login
  },
  SignUp: {
    screen: SignUp
  },
  Home: {
    screen: Home
  }
};

// After creating the stack navigation the screen passed into it then stored in the homestack
const HomeStack = createStackNavigation(screens);

//The HomeStack is passed into this AppContainer so that it can be rendered by the root file (App.js)
export default createAppContainer(HomeStack);
