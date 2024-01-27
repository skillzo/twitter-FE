import {
  View,
  ScrollView,
  Pressable,
  Platform,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import TweetCard from "../../components/tweet/TweetCard";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet";
import ProfileBottomSheet from "../../components/user/ProfileBottomSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";
import { axiosInstance } from "../../../config/AxiosInstance";
import { useAuth } from "../../../store/authContext";

export default function Feeds({ navigation }) {
  //const bottomSheetModalRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%", "75%", "95%"], []);
  const { auth } = useAuth();

  const handleOpen = useCallback(() => {
    //bottomSheetModalRef.current?.present();
    bottomSheetRef.current?.expand();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("twitter-auth");
    navigation.navigate("login");
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const {
    data: allTweets,
    isLoading,
    refetch,
  } = useQuery("api/tweet/getAll", async () => {
    return axiosInstance.get("api/tweet/getAll");
  });

  if (isLoading) {
    return (
      <View className="flex-1 bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      className={` bg-white flex-1 relative z-10 ${
        Platform.OS === "andriod" ? "pt-4" : ""
      }`}
    >
      {/* <Button title="Open modal" onPress={handleOpen} />
      <Button title="Logout" onPress={logout} /> */}

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
          <ProfileBottomSheet />
        </View>
      </BottomSheet>

      <FlatList
        className="px-3 space-y-2 py-2 -z-20"
        data={allTweets?.data?.data}
        ListEmptyComponent={<Text>No Feed 👍</Text>}
        ListFooterComponent={
          <Text className="text-center text-gray-500">
            You are all caught 👍
          </Text>
        }
        renderItem={({ item }) => {
          return (
            <TweetCard
              key={item?._id}
              id={item?._id}
              keyExtractor={(item) => item._id}
              name={item?.user?.name}
              createdAt={item.createdAt}
              verified={item?.user?.verified}
              username={item?.user?.username}
              pfp={item?.user?.profile?.profile_picture}
              images={item?.image}
              content={item.content}
              no_of_comments={item.no_of_comments}
              no_of_retweets={item.no_of_retweets}
              no_of_likes={item.no_of_likes}
            />
          );
        }}
        refreshing={isLoading}
        onRefresh={() => refetch()}
      />

      {/* <ScrollView className="px-6 space-y-2 py-2 -z-20">
        {allTweets?.data?.data?.map((tweet) => (
          <TweetCard
            key={tweet?._id}
            name={tweet?.user?.name}
            createdAt={tweet.createdAt}
            verified={tweet?.user?.verified}
            username={tweet?.user?.username}
            pfp={tweet?.user?.image}
            images={tweet?.image}
            content={tweet.content}
            no_of_comments={tweet.no_of_comments}
            no_of_retweets={tweet.no_of_retweets}
            no_of_likes={tweet.no_of_likes}
          />
        ))}
      </ScrollView> */}

      <Pressable
        onPress={() => navigation.navigate("Create-Tweet")}
        className="absolute -z-10 right-7 bottom-10 w-[55px] h-[55px] bg-[#4C9EEB] rounded-full flex justify-center items-center"
      >
        <AntDesign name="plus" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
