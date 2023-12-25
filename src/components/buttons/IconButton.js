import { View, Text } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";

export default function IconButton({ name, number }) {
  return (
    <View className="flex flex-row items-center">
      <EvilIcons name={name} size={26} color="#687684" />
      <Text className="text-[12px]">{number}</Text>
    </View>
  );
}
