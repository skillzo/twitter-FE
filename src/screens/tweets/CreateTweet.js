import { View, Text, TextInput, Image } from "react-native";
import React, { useEffect } from "react";

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
  return (
    <View className=" flex-1 px-4 py-2 bg-white">
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
          multiline
          maxLength={200}
        />
      </View>
    </View>
  );
}
