import { View, Text, Pressable, Image } from "react-native";
import React from "react";

export default function NotificationCard() {
  return (
    <Pressable className="my-2 border-b border-gray-300 pb-4">
      <View className="flex flex-row gap-6">
        <Image
          className="w-[30px] h-[30px] object-cover rounded-full"
          source={require("../../../assets/images/notification-icon.png")}
        />
        <View className="flex-1 space-y-2">
          <Image
            className="w-[45px] h-[45px] object-cover rounded-full"
            source={{
              uri: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
            }}
          />

          <Text>
            In case you missed{" "}
            <Text className="font-semibold"> Saad Drusteer’s</Text> Tweet
          </Text>

          <Text className="text-[14px] font-light text-gray-700 ">
            🔥 Are you using WordPress and migrating to the JAMstack? I wrote up
            a case study about how Smashing Magazine moved to JAMstack and saw
            great performance improvements and better security.
            smashingdrusteer.com/2020/01/migrat...
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
