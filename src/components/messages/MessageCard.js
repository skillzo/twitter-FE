import { View, Text, Pressable } from "react-native";
import React from "react";
import PFP from "../user/PFP";
import { useNavigation } from "@react-navigation/native";

export default function MessageCard() {
  const navigate = useNavigation();
  return (
    <Pressable
      onPress={() => navigate.navigate("Message-Slug")}
      className="flex flex-row  gap-x-2 border-b border-gray-200 pb-3 my-2  "
    >
      <PFP styleProps="w-[50px] h-[50px]" />

      <View className="flex-1  ">
        <View className="flex flex-row justify-between">
          <View className="">
            <Text className="font-semibold">
              AzizDjan{" "}
              <Text className="text-gray-400 text-xs"> @A_AzizDjan </Text>{" "}
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
