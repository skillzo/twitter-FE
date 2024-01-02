import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useTweet } from "../../hooks/useTweet";
import ImageGrid from "../../components/ImageGrid";
import CommentCard from "../../components/tweet/CommentCard";
import dayjs from "dayjs";
import { useMutation } from "react-query";
import { axiosInstance } from "../../../config/AxiosInstance";

export default function TweetSlug({ route }) {
  const { tweetById, tweetByIdLoading, refetchById } = useTweet(
    route?.params?.tweet_id
  );

  const [tweet, setTweet] = useState("");

  const tweetByIdData = useMemo(() => tweetById?.data?.data, [tweetById]);

  const { mutate, isLoading } = useMutation(
    async (data) => {
      return axiosInstance.post(
        `api/comment/create/${route?.params?.tweet_id}`,
        data
      );
    },
    {
      onSuccess: () => {
        setTweet("");
        refetchById();
      },
      onError: (error) => {
        Alert.alert(error?.response?.data?.message);
      },
    }
  );

  return (
    <View className="flex-1  bg-white pb-5 px-4 pt-3   ">
      <FlatList
        data={tweetByIdData?.comments}
        ListHeaderComponent={
          <View className="mb-5 flex-1">
            <View className=" ">
              <View className=" space-y-6">
                <View className="flex flex-row items-center gap-x-2">
                  <Image
                    className="w-[50px] h-[50px] object-cover rounded-full "
                    src={
                      tweetById?.user?.profile?.profile_picture ||
                      "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                    }
                  />

                  <View>
                    <Text className="font-semibold text-[16px]">
                      {tweetByIdData?.user?.profile?.name}
                    </Text>
                    <Text className="text-gray-400">
                      @{tweetByIdData?.user?.username}
                    </Text>
                  </View>
                </View>

                <Text className="text-lg  font-[300]">
                  {tweetByIdData?.content}
                </Text>

                {tweetByIdData?.image > 0 && (
                  <View className="my-2">
                    <ImageGrid
                      images={tweetByIdData?.image}
                      styleprops="!h-[250px]"
                    />
                  </View>
                )}

                <View className="flex flex-row gap-x-2">
                  <Text className="text-gray-600">2:45PM</Text>
                  <Text className="text-gray-600">
                    {dayjs(tweetByIdData?.updatedAt).format("YYYY")}
                  </Text>
                </View>

                <View className="border-y border-gray-300 py-2 flex flex-row ">
                  <Pressable>
                    <StatDetails
                      stat={tweetByIdData?.no_of_retweets}
                      text="Reposts"
                    />
                  </Pressable>
                  <Pressable>
                    <StatDetails
                      stat={tweetByIdData?.no_of_likes}
                      text="Likes"
                    />
                  </Pressable>
                </View>
              </View>
            </View>

            <View>
              <TextInput
                placeholder="Post your reply"
                className="bg-gray-100 rounded-full py-3 px-4 mt-4"
                value={tweet}
                onChangeText={(text) => setTweet(text)}
                multiline
                maxLength={200}
              />

              <View className="flex flex-row justify-end mt-2">
                <TouchableOpacity
                  onPress={() => mutate({ content: tweet })}
                  className="bg-[#4C9EEB] px-6 py-2 rounded-full w-max "
                >
                  <Text className="text-white">Reply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        // inverted
        showsVerticalScrollIndicator={false}
        refreshing={tweetByIdLoading}
        keyExtractor={(item) => item._id}
        onRefresh={() => refetchById()}
        renderItem={({ item }) => {
          return (
            <CommentCard
              key={item?._id}
              id={item?._id}
              name={item?.user?.name}
              updatedAt={item.updatedAt}
              verified={item?.user?.verified}
              username={item?.user?.username}
              pfp={item?.user?.image}
              images={item?.image}
              content={item.content}
              no_of_likes={item.no_of_likes}
            />
          );
        }}
      />
    </View>
  );
}

const StatDetails = ({ text, stat }) => {
  return (
    <View className="flex flex-row gap-x-1 mx-2">
      <Text className="font-semibold">{stat}</Text>
      <Text className="text-gray-500">{text}</Text>
    </View>
  );
};
