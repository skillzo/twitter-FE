import { View, Text, TextInput } from "react-native";
import React from "react";

export default function Input({ leftIcon, rightIcon, ...props }) {
  return (
    <View className="flex flex-row py-2 px-4 bg-gray-100 rounded-full ">
      {leftIcon}
      <TextInput className="ml-2" {...props} />
      {rightIcon}
    </View>
  );
}
