import { Button, FlatList, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import MessageCard from "../../../components/messages/MessageCard";
import Input from "../../../components/Input/Input";
import { EvilIcons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { axiosInstance } from "../../../../config/AxiosInstance";
import { useAuth } from "../../../../store/authContext";

export default function Messages({ navigation }) {
  const { auth } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [usersList, setUsersList] = useState([]);
  const getUserById = async (id) => {
    const res = await axiosInstance.get(`api/users/getById/${id}`);
    return res?.data;
  };

  const { isLoading, refetch } = useQuery(
    "/api/conversation",
    async () => {
      return axiosInstance.get(`/api/conversation/${auth?.id}`);
    },
    {
      onSuccess: async (response) => {
        const usersConversationList = await Promise.all(
          response?.data?.map(async (con) => {
            const user = await getUserById(
              con?.members?.filter((mem) => mem !== auth?.id)[0]
            );
            return {
              conversationId: con?._id,
              receiver: user,
            };
          })
        );

        setUsersList(usersConversationList);
      },
    }
  );

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

      {usersList?.length > 0 && (
        <FlatList
          className="px-3 space-y-2 py-2 -z-20"
          data={usersList}
          ListEmptyComponent={<Text> You Have No Messages</Text>}
          ListFooterComponent={
            <Text className="text-center text-gray-500">
              You are all caught 👍
            </Text>
          }
          renderItem={({ item }) => {
            return (
              <MessageCard
                key={item?.conversationId}
                conversationId={item?.conversationId}
                profilePicture={item?.receiver?.profile?.profile_picture}
                name={item?.receiver?.profile?.name}
                username={item?.receiver?.username}
              />
            );
          }}
          refreshing={isLoading}
          onRefresh={() => refetch()}
        />
      )}
    </View>
  );
}
