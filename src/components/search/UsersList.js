import { Image, ScrollView, Text, View } from "react-native";
import React from "react";

export default function UsersList() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="p-4">
      <TwitterUser />
      <TwitterUser />
      <TwitterUser />
      <TwitterUser />
    </ScrollView>
  );
}

const TwitterUser = () => {
  return (
    <View className="flex flex-row gap-x-2 items-start my-3">
      <Image
        className="w-[40px] h-[40px] object-cover rounded-full"
        source={{
          uri: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
        }}
      />

      <View>
        <Text className="font-semibold text-base" numberOfLines={1}>
          Sab Khasannnn
        </Text>
        <Text numberOfLines={1} className="text-gray-700 text-sm text-center">
          @s_khasannnnnnnnnnn
        </Text>
      </View>
    </View>
  );
};
