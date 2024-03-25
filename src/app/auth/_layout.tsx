import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "../../../firebase/firebaseConfig"
import Login from "./login";
import Signup from "./signup";
const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login"
        screenOptions={{headerShown : false}}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
