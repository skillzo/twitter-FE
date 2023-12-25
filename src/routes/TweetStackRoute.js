import { createStackNavigator } from "@react-navigation/stack";
import Feeds from "../screens/tweets/Feeds";
import TweetSlug from "../screens/tweets/TweetSlug";
import CreateTweet from "../screens/tweets/CreateTweet";
import { Pressable, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserConversation from "../screens/tab/messages/UserConversation";

const Stack = createStackNavigator();

export const TweetStackRoute = () => {
  const navigate = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Message-Slug"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Feeds" component={Feeds} />

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
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <Pressable onPress={() => navigate.goBack()} className="ml-4">
              <Text className="text-[16px]">Cancel</Text>
            </Pressable>
          ),
          headerRight: () => (
            <TouchableOpacity
              // onPress={() => navigate.goBack()}
              className="bg-[#4C9EEB] px-4 py-2 rounded-full mr-4"
            >
              <Text className="text-white">Post</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
