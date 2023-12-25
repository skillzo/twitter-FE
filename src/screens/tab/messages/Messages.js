import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import MessageCard from "../../../components/messages/MessageCard";
import Input from "../../../components/Input/Input";
import { EvilIcons } from "@expo/vector-icons";

export default function Messages({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <View className="flex-1 bg-white ">
      <View className="w-[95%] mx-auto pb-3 border-b border-gray-100 mt-2 ">
        <Input
          className="ml-2"
          placeholder="Search for people and groups"
          leftIcon={<EvilIcons name="search" size={24} color="#687684" />}
          // value={searchQuery}
          // onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <ScrollView className="h-full px-6 py-4 ">
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
      </ScrollView>
    </View>
  );
}
