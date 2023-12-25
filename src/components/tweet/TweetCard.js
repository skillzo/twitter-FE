import React, { useMemo } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../buttons/IconButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

export default function TweetCard({
  name,
  createdAt,
  username,
  content,
  image,
  no_of_comments,
  no_of_likes,
  no_of_retweets,
  verified,
}) {
  let now = dayjs();
  const navigate = useNavigation();
  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);

  const checkTimeDiff = (time) => {
    const diff = now?.diff(time, "second");
    return diff;
  };

  dayjs.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "%d s",
      m: "a m",
      mm: "%d m",
      h: "an h",
      hh: "%dh",
      d: "a d",
      dd: "%d d",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    },
  });

  const time =
    checkTimeDiff(createdAt) < 518400
      ? dayjs(createdAt).fromNow(true)
      : dayjs(createdAt).format("DD/MM/YYYY");

  return (
    <View className="flex flex-row gap-x-4 my-2 border-b last:border-none pb-4 border-gray-200">
      <Image
        className="w-[45px] h-[45px] object-cover rounded-full"
        src={image}
      />

      <View className="flex-1 space-y-1">
        <Pressable
          className="space-y-1"
          onPress={() => navigate.push("Tweet-Slug")}
        >
          {/* <Text className="text-gray-500 font-medium text-[12px]">
            Zack John liked
          </Text> */}

          <View
            className={`flex flex-row items-center ${
              verified ? "space-x-2" : ""
            }`}
          >
            <View className="flex flex-row items-center">
              <Text className="font-semibold">{name} </Text>
              {verified && (
                <Image
                  source={require("../../../assets/images/twitter-blue.png")}
                  className="w-[15px] h-[15px] object-cover "
                />
              )}
            </View>

            <Text className="text-gray-600 text-[14px]">
              @{username} · {time}
            </Text>
          </View>

          <Text className="">{content}</Text>
        </Pressable>

        <View className="flex flex-row  justify-between items-center w-[70%]">
          <IconButton name="comment" number={no_of_comments} />
          <IconButton name="retweet" number={no_of_retweets} />
          <IconButton name="heart" number={no_of_likes} />
        </View>
      </View>
    </View>
  );
}
