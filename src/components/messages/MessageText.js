import { View, Text } from "react-native";
import React from "react";

export default function MessageText({ user, text }) {
  return user ? (
    <View className="flex flex-row justify-end ">
      <View className="bg-m-blue w-max max-w-[60%]  rounded-2xl px-4 py-3 my-3 rounded-br-none ">
        <Text className=" text-white">{text}</Text>
      </View>
    </View>
  ) : (
    <View className="flex flex-row justify-start ">
      <View className="bg-gray-200 w-max max-w-[60%]  rounded-2xl px-4 py-3 my-3 rounded-bl-none  ">
        <Text className="font-light">{text}</Text>
      </View>
    </View>
  );
}
