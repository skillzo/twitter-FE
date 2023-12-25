import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import UsersList from "../../components/search/UsersList";
import RecentSearchHistory from "../../components/search/RecentSearchHistory";

export default function Search({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  console.log(searchQuery);
  return (
    <View className="flex-1 bg-white pt-2 space-y-4">
      <View className="flex flex-row justify-between items-center px-2 pb-3">
        <View className="flex flex-row w-[85%] py-2 px-4 bg-gray-100 rounded-full ">
          <EvilIcons name="search" size={24} color="#687684" />
          <TextInput
            className="ml-2"
            placeholder="Search Twitter"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text className="text-m-blue text-[16px]">Cancel</Text>
        </Pressable>
      </View>

      {searchQuery.length > 1 ? <UsersList /> : <RecentSearchHistory />}
    </View>
  );
}
