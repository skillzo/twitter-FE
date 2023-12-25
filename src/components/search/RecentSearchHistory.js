import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function RecentSearchHistory() {
  return (
    <View className="bg-[#E7ECF0] h-full ">
      <View className=" flex flex-row justify-between px-4 py-3 mt-2 ">
        <Text className="font-bold text-[16px] text-[#687684] ">
          Recent searches
        </Text>
        <MaterialIcons name="cancel" size={24} color="#ACB7C1" />
      </View>

      <View className="bg-white py-6 px-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <RecentlySearchedUser />
          <RecentlySearchedUser />
          <RecentlySearchedUser />
          <RecentlySearchedUser />
          <RecentlySearchedUser />
          <RecentlySearchedUser />
        </ScrollView>
      </View>
    </View>
  );
}

const RecentlySearchedUser = () => {
  return (
    <View className="flex justify-center items-center w-[100px]">
      <Image
        className="w-[60px] h-[60px] object-cover rounded-full"
        source={{
          uri: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
        }}
      />

      <Text className="w-[90%] truncate text-center text-xs" numberOfLines={1}>
        Sab Khasannnn
      </Text>
      <Text
        numberOfLines={1}
        className="w-[80%] truncate text-gray-600 text-xs text-center"
      >
        @s_khasannnnnnnnnnn
      </Text>
    </View>
  );
};
