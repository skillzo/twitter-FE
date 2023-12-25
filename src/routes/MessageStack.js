import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserConversation from "../screens/tab/messages/UserConversation";
import Messages from "../screens/tab/messages/Messages";

const Stack = createStackNavigator();

export default function MessageStack() {
  return (
    <Stack.Navigator initialRouteName="Message">
      <Stack.Screen
        name="Message"
        component={Messages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Message-Slug"
        component={UserConversation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
