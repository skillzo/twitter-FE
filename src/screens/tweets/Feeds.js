import {
  View,
  ScrollView,
  Pressable,
  Platform,
  Button,
  Text,
  StyleSheet,
} from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import TweetCard from "../../components/tweet/TweetCard";
import { tweets } from "../../../assets/data/tweets";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet";
import ProfileBottomSheet from "../../components/user/ProfileBottomSheet";

export default function Feeds({ navigation }) {
  //const bottomSheetModalRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%", "75%", "95%"], []);

  const handleOpen = useCallback(() => {
    //bottomSheetModalRef.current?.present();
    bottomSheetRef.current?.expand();
  }, []);

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

  return (
    <View
      className={` bg-white flex-1 relative z-10 ${
        Platform.OS === "andriod" ? "pt-4" : ""
      }`}
    >
      <Button title="Open modal" onPress={handleOpen} />

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

      <ScrollView className="px-6 space-y-2 py-2 -z-20">
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
