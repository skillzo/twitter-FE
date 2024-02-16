import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import PFP from "../user/PFP";
import { useNavigation } from "@react-navigation/native";

export default function MessageCard({
  username,
  name,
  profilePicture,
  conversationId,
}) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Message-Slug", {
          conversationId,
          name,
          profilePicture,
        })
      }
      className="flex flex-row  gap-x-2 border-b border-gray-200 pb-3 my-2  "
    >
      <Image
        className={` w-[50px] h-[50px] object-cover rounded-full`}
        src={profilePicture}
      />

      <View className="flex-1  ">
        <View className="flex flex-row justify-between">
          <View className="">
            <Text className="font-semibold">
              {name}{" "}
              <Text className="text-gray-400 text-xs"> @{username} </Text>{" "}
            </Text>
          </View>

          <Text className="text-gray-400 text-xs"> 12/2/19</Text>
        </View>

        <Text numberOfLines={2} className="text-xs w-[90%] mt-[2px]">
          You: I would greatly appreciate if you could retweet this if you think
          its worthy :
        </Text>
      </View>
    </Pressable>
  );
}
