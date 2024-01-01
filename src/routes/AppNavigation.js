import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/auth/Login";
import { DrawerStack } from "./DrawerStack";
import TabRoutes from "./TabRoutes";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../../store/authContext";
import SignUp from "../screens/auth/Signup";

export default function AppNavigation() {
  const Stack = createStackNavigator();

  const { auth } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="main"
        screenOptions={{ headerShown: false }}
      >
        {/* {auth?.token ? ( */}
        <>
          <Stack.Screen name="main" component={DrawerStack} />
        </>
        {/* ) : ( */}
        <>
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="sign-up"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </>
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
