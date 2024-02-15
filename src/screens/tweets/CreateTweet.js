import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { axiosInstance } from "../../../config/AxiosInstance";
import { useTweet } from "../../hooks/useTweet";
import * as ImagePicker from "expo-image-picker";

export default function CreateTweet({ navigation }) {
  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: "none" }, tabBarVisible: false });
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);

  const [tweet, setTweet] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const { refetchAllTweets } = useTweet();

  const { mutate } = useMutation(
    async (data) => {
      return axiosInstance.post("/api/tweet/create", data);
    },
    {
      onSuccess: () => {
        navigation.navigate("Feeds");
        refetchAllTweets();
      },
      onError: (error) => {
        Alert.alert(error?.response?.data?.message);
      },
    }
  );

  // upload user image
  const uploadeFromFilePicker = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        // allowsMultipleSelection: false,
      });

      if (!result.canceled) {
        setUploadedImage(result.assets[0].uri);
        // setUploadedImage(result.assets.map((image) => image.uri));
      }
    } catch (err) {
      console.log("upload error here", err);
    }
  };

  // upload image to cloudinary
  

  // console.log("uploaded images", uploadedImage);

  return (
    <View className=" flex-1 px-4 py-2 bg-white">
      <View className="flex flex-row justify-between mb-4">
        <Pressable onPress={() => navigation.goBack()} className="">
          <Text className="text-[16px]">Cancel</Text>
        </Pressable>

        <TouchableOpacity
          onPress={() => mutate({ content: tweet })}
          className="bg-[#4C9EEB] px-4 py-2 rounded-full "
        >
          <Text className="text-white">Post</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row gap-x-2">
        <Image
          className="w-[45px] h-[45px] object-cover rounded-full"
          source={{
            uri: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
          }}
        />
        <TextInput
          placeholder="What's happening"
          className="flex-1 "
          value={tweet}
          autoFocus
          multiline
          maxLength={200}
          onChangeText={(text) => setTweet(text)}
        />
      </View>

      <View className="flex flex-row justify-end ">
        <TouchableOpacity
          onPress={() => uploadeFromFilePicker()}
          className="bg-[#4C9EEB] px-4 py-2 rounded-full "
        >
          <Text className="text-white">Upload Images</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

let image = {
  canceled: false,
  assets: [
    {
      base64: null,
      fileSize: 342919,
      assetId: "106E99A1-4F6A-45A2-B320-B0AD4A8E8473/L0/001",
      fileName: "IMG_0001.jpg",
      height: 2848,
      duration: null,
      type: "image",
      uri: "file:///Users/macbookprom1/Library/Developer/CoreSimulator/Devices/A58F1BAF-B936-4961-8A1D-7DDD796C8367/data/Containers/Data/Application/1277DDAB-56A3-483B-B888-1EF9B092C1B6/Library/Caches/ExponentExperienceData/%2540anonymous%252Ftwitter-frontend-6b3f511d-d9b5-4ce1-845c-92c818f366ea/ImagePicker/77CBFF96-DBB9-4895-8634-2C83A4A40DE0.jpg",
      exif: null,
      width: 4288,
    },
  ],
  cancelled: false,
};
