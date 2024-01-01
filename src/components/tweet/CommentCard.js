import React, { useMemo } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../buttons/IconButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import ImageGrid from "../ImageGrid";

export default function CommentCard({
  id,
  name,
  updatedAt,
  username,
  content,
  pfp,
  no_of_comments,
  no_of_likes,
  no_of_retweets,
  verified,
  images,
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
      m: "1m",
      mm: "%d m",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%d d",
      M: "1 month",
      MM: "%d months",
      y: "1 year",
      yy: "%d years",
    },
  });

  const time =
    checkTimeDiff(updatedAt) < 518400
      ? dayjs(updatedAt).fromNow(true)
      : dayjs(updatedAt).format("DD/MM/YYYY");

  return (
    <View className="flex flex-row gap-x-4 my-2 border-b last:border-none pb-4 border-gray-200">
      <Image
        className="w-[45px] h-[45px] object-cover rounded-full "
        src={
          pfp ||
          "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
        }
      />

      <View className="flex-1 space-y-1">
        <View className={`space-y-1 ${images?.length > 0 ? "mb-2" : ""} `}>
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
        </View>

        <View className="mb-2">
          {images?.length > 0 && <ImageGrid images={images} />}
        </View>

        <View className="flex flex-row  justify-end items-center w-[70%]">
          {/* <IconButton name="comment" number={no_of_comments} /> */}
          {/* <IconButton name="retweet" number={no_of_retweets} /> */}
          <IconButton name="heart" number={no_of_likes} />
        </View>
      </View>
    </View>
  );
}
