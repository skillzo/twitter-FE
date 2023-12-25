import { View, ScrollView, Pressable, Platform } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import TweetCard from "../../components/tweet/TweetCard";
import { tweets } from "../../../assets/data/tweets";

export default function Feeds({ navigation }) {
  return (
    <View
      className={` bg-white flex-1 ${Platform.OS === "andriod" ? "pt-4" : ""}`}
    >
      <ScrollView className="px-6 space-y-2 py-2">
        {tweets?.map((tweet) => (
          <TweetCard
            key={tweet?.id}
            name={tweet?.user?.name}
            createdAt={tweet.createdAt}
            verified={tweet?.user?.verified}
            username={tweet?.user?.username}
            image={tweet?.user?.image}
            content={tweet.content}
            no_of_comments={tweet.no_of_comments}
            no_of_retweets={tweet.no_of_retweets}
            no_of_likes={tweet.no_of_likes}
          />
        ))}
      </ScrollView>

      <Pressable
        onPress={() => navigation.navigate("Create-Tweet")}
        className="absolute right-7 bottom-10 w-[55px] h-[55px] bg-[#4C9EEB] rounded-full flex justify-center items-center"
      >
        <AntDesign name="plus" size={24} color="white" />
      </Pressable>
    </View>
  );
}
