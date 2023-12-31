import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { TweetStackRoute } from "./TweetStackRoute";
import Search from "../screens/tab/Search";
import { NotificationsTopNav } from "./NotificationsTopNav";
import MessageStack from "./MessageStack";
import PFP from "../components/user/PFP";
import { View } from "react-native";

export default function TabRoutes() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Search") {
            iconName = focused ? "search-sharp" : "search-outline";
          } else if (route.name === "Notifications") {
            iconName = focused
              ? "notifications-sharp"
              : "notifications-outline";
          } else if (route.name === "Messages") {
            iconName = focused ? "mail" : "mail-outline";
          }

          return route.name === "Home" ? (
            <MaterialCommunityIcons
              name={focused ? "home-lightbulb" : "home-lightbulb-outline"}
              size={26}
            />
          ) : (
            <Ionicons name={iconName} size={24} color={color} />
          );
        },
        tabBarActiveTintColor: "#4C9EEB",
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: false,
        headerShadowVisible: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={TweetStackRoute} />

      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen
        name="Notifications"
        component={NotificationsTopNav}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: {
            backgroundColor: "#4C9EEB",
            color: "white",
          },
          headerShown: true,
          headerLeft: () => <PFP styleProps="!ml-4 " />,
          headerRight: () => (
            <View className="mr-4">
              <Ionicons name="settings-outline" size={24} color="#4C9EEB" />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: {
            backgroundColor: "#4C9EEB",
            color: "white",
          },
          headerShown: true,
          headerLeft: () => <PFP styleProps="!ml-4 " />,
          headerRight: () => (
            <View className="mr-4">
              <Ionicons name="settings-outline" size={24} color="#4C9EEB" />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
