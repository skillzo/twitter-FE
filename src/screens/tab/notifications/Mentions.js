import { View, Text, ScrollView } from "react-native";
import React from "react";
import TweetCard from "../../../components/tweet/TweetCard";
export default function Mentions() {
  return (
    <ScrollView className="px-6 space-y-2 bg-white py-2">
      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
      <TweetCard />
    </ScrollView>
  );
}
