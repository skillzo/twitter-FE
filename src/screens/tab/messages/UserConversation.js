import { View, Text, Image, Pressable, ScrollView, Button } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MessageText from "../../../components/messages/MessageText";
import { io } from "socket.io-client";
import { useAuth } from "../../../../store/authContext";

export default function UserConversation({ navigation }) {
  useEffect(() => {
    navigation.getParent()?.setOptions({ headerShown: false });
    return () => navigation.getParent()?.setOptions({ headerShown: undefined });
  }, [navigation]);

  const socket = useRef();
  const { auth } = useAuth();

  const navigate = useNavigation();
  const [refreshWs, setRefreshWs] = useState(false);

  useEffect(() => {
    socket.current = io("http://localhost:80/");
    socket.current.emit("addUser", { userId: auth?.id });

    socket.current.on("getUsers", (data) => {
      console.log(data);
    });
  }, [refreshWs]);

  return (
    <View className="flex-1 bg-white">
      {/* custom header */}
      <Button title="Refresh " onPress={() => setRefreshWs(!refreshWs)} />
      <View className="pb-2">
        <View className="flex flex-row justify-between items-center px-3 pb-2 ">
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>

          <View className="flex items-center">
            <Image
              className="w-[35px] h-[35px] object-cover rounded-full"
              source={{
                uri: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
              }}
            />
          </View>

          <Pressable>
            <Ionicons name="settings-outline" size={24} color="black" />
          </Pressable>
        </View>

        <Text className="font-[700] text-[16px] mt-[1px] text-center">
          AlwaysAngry
        </Text>
      </View>

      <ScrollView className="px-4">
        <MessageText />
        <MessageText user />
        <MessageText />
        <MessageText />
        <MessageText user />
        <MessageText />
        <MessageText />
        <MessageText />
        <MessageText user />
        <MessageText />
        <MessageText />
        <MessageText user />
      </ScrollView>
    </View>
  );
}
