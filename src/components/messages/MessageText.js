import { View, Text } from "react-native";
import React from "react";

export default function MessageText({ user }) {
  return user ? (
    <View className="flex flex-row justify-end ">
      <View className="bg-m-blue  max-w-[60%]  rounded-2xl px-4 py-3 my-3 rounded-br-none ">
        <Text className=" text-white">
          MessageText shs8uxsxisjnxisuxnsjnxsnxsjnisnsisxisxnsjnssn
        </Text>
      </View>
    </View>
  ) : (
    <View className="bg-gray-200  max-w-[60%]  rounded-2xl px-4 py-3 my-3 rounded-bl-none  ">
      <Text className="font-light">
        MessageText shs8uxsxisjnxisuxnsjnxsnxsjnisnsisxisxnsjnssn
      </Text>
    </View>
  );
}
