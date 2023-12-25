import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, View } from "react-native";
import { TweetStackRoute } from "./src/routes/TweetStackRoute";
import Messages from "./src/screens/tab/messages/Messages";
import Search from "./src/screens/tab/Search";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { NotificationsTopNav } from "./src/routes/NotificationsTopNav";
import PFP from "./src/components/user/PFP";
import MessageStack from "./src/routes/MessageStack";

export default function App({}) {
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView className="flex-1">
      <NavigationContainer>
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
          <Tab.Screen
            name="Home"
            component={TweetStackRoute}
            options={{
              headerShown: true,
              headerShadowVisible: true,
              headerLeft: () => <PFP styleProps="!ml-4 " />,
              headerTitle: () => (
                <AntDesign name="twitter" size={24} color="#4C9EEB" />
              ),
              headerRight: () => (
                <View className="mr-4">
                  <Ionicons name="settings-outline" size={24} color="#4C9EEB" />
                </View>
              ),
            }}
          />
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
      </NavigationContainer>
    </SafeAreaView>
  );
}
