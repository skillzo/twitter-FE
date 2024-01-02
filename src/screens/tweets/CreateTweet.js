import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { axiosInstance } from "../../../config/AxiosInstance";
import { useTweet } from "../../hooks/useTweet";

export default function CreateTweet({ navigation }) {
  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: "none" }, tabBarVisible: false });
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);

  const [tweet, setTweet] = useState("");
  const { refetchAllTweets } = useTweet();

  const { mutate, isLoading } = useMutation(
    async (data) => {
      return axiosInstance.post("/api/tweet/create", data);
    },
    {
      onSuccess: () => {
        navigation.navigate("Feeds");
        refetchAllTweets();
      },
      onError: (error) => {
        Alert.alert(error?.response?.data?.message);
      },
    }
  );
  return (
    <View className=" flex-1 px-4 py-2 bg-white">
      <View className="flex flex-row justify-between mb-4">
        <Pressable onPress={() => navigation.goBack()} className="">
          <Text className="text-[16px]">Cancel</Text>
        </Pressable>

        <TouchableOpacity
          onPress={() => mutate({ content: tweet })}
          className="bg-[#4C9EEB] px-4 py-2 rounded-full "
        >
          <Text className="text-white">Post</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row gap-x-2">
        <Image
          className="w-[45px] h-[45px] object-cover rounded-full"
          source={{
            uri: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
          }}
        />
        <TextInput
          placeholder="What's happening"
          className="flex-1 "
          value={tweet}
          onChangeText={(text) => setTweet(text)}
          multiline
          maxLength={200}
        />
      </View>
    </View>
  );
}
