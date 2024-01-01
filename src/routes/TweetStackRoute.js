import { createStackNavigator } from "@react-navigation/stack";
import Feeds from "../screens/tweets/Feeds";
import TweetSlug from "../screens/tweets/TweetSlug";
import CreateTweet from "../screens/tweets/CreateTweet";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PFP from "../components/user/PFP";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export const TweetStackRoute = () => {
  const navigate = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Message-Slug"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Feeds"
        component={Feeds}
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

      <Stack.Screen
        name="Tweet-Slug"
        component={TweetSlug}
        options={{
          title: "Post",
          headerShown: true,
          headerLeftLabelVisible: false,
        }}
      />
      <Stack.Screen
        name="Create-Tweet"
        component={CreateTweet}
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
};
