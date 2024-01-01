import {
  View,
  Text,
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Pressable,
  FlatList,
  VirtualizedList,
} from "react-native";
import React, { useMemo } from "react";
import { useTweet } from "../../hooks/useTweet";
import ImageGrid from "../../components/ImageGrid";
import PFP from "../../components/user/PFP";
import TweetCard from "../../components/tweet/TweetCard";

export default function TweetSlug({ route }) {
  const { tweetById, tweetByIdLoading } = useTweet(route?.params?.tweet_id);

  const tweetByIdData = useMemo(() => tweetById?.data?.data, [tweetById]);

  if (tweetByIdLoading) {
    return (
      <View className="flex-1 bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={tweetById?.comments}
        ListHeaderComponent={
          <View>
            <React.Fragment className=" bg-white">
              <View className=" pb-5 px-4 pt-3  space-y-12 flex justify-between">
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

                  <View className="my-2">
                    <ImageGrid
                      images={tweetByIdData?.image}
                      styleprops="!h-[250px]"
                    />
                  </View>

                  <View className="flex flex-row gap-x-2">
                    <Text className="text-gray-600">2:45PM</Text>
                    <Text className="text-gray-600"> 01/01/2024</Text>
                    <Text className="text-black">
                      365k{" "}
                      <Text className="text-gray-600 font-semibold">View</Text>
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

              <TextInput
                placeholder="Post your reply"
                className="bg-gray-100 rounded-full py-3 px-4 "
              />
            </React.Fragment>
          </View>
        }
        refreshing={tweetByIdLoading}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TweetCard
              key={item?._id}
              id={item?._id}
              name={item?.user?.name}
              createdAt={item.createdAt}
              verified={item?.user?.verified}
              username={item?.user?.username}
              pfp={item?.user?.image}
              images={item?.image}
              content={item.content}
              no_of_comments={item.no_of_comments}
              no_of_retweets={item.no_of_retweets}
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
