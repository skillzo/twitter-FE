import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React from "react";
import PFP from "./PFP";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { tweets } from "../../../assets/data/tweets";
import TweetCard from "../tweet/TweetCard";
import { useAuth } from "../../../store/authContext";

export default function ProfileBottomSheet() {
  const { auth } = useAuth();

  return (
    <ScrollView className="">
      <View>
        <View className="bg-[#000] flex flex-row">
          <Image
            src={
              "https://timelinecovers.pro/facebook-cover/download/life-facebook-cover.jpg"
            }
            className="w-full h-[150px] object-cover opacity-50"
          />
        </View>

        <View className="px-3 ">
          <View className="flex flex-row justify-between items-start  ">
            <View className="border-[3px] border-white bg-white relative -top-7 rounded-full">
              <PFP styleProps="w-[70px] h-[70px] " />
            </View>

            <View className="flex flex-row gap-x-4  mt-2">
              <Pressable className="border border-gray-300 rounded-full h-[40px] w-[40px] flex justify-center items-center  active:bg-gray-100">
                <Ionicons name="ios-mail-outline" size={24} color="black" />
              </Pressable>
              <Pressable className="border flex justify-center items-center border-gray-300 rounded-full px-4 py-1.5 active:bg-gray-100">
                <Text className="font-medium"> Edit Profile</Text>
              </Pressable>
            </View>
          </View>

          <View className="space-y-6 -mt-3">
            <View>
              <View className="flex flex-row items-center gap-x-2">
                <Text className="text-xl font-bold">
                  {auth?.profile?.first_name} {auth?.profile?.last_name}
                </Text>
                <Image
                  source={require("../../../assets/images/twitter-blue.png")}
                  className="w-[15px] h-[15px] object-cover "
                />
              </View>
              <Text className="text-gray-600">@{auth?.username}</Text>
            </View>

            <View className="space-y-2">
              <Text numberOfLines={3}>{auth?.profile?.bio}</Text>

              <View className="flex flex-row items-center space-x-4">
                <View>
                  <Detail
                    icon={
                      <Ionicons
                        name="md-location-outline"
                        size={16}
                        color="#687684"
                      />
                    }
                    text="Lagos, Nigeria"
                  />
                </View>

                <View>
                  <Detail
                    icon={
                      <AntDesign name="calendar" size={14} color="#687684" />
                    }
                    text="Joined September 2018"
                  />
                </View>
              </View>

              <View className="flex flex-row space-x-2">
                <View>
                  <Detail main="12.5k" text="Following" />
                </View>

                <View>
                  <Detail main="61.5k" text="Followers" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="px-3 mt-8">
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
      </View>
    </ScrollView>
  );
}

const Detail = ({ text, icon, main }) => {
  return (
    <View className=" flex flex-row  items-center space-x-0.5">
      {icon}
      <Text className="font-semibold">{main}</Text>
      <Text className="text-gray-600 text-[13px]">{text}</Text>
    </View>
  );
};
