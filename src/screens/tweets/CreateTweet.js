import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { axiosInstance } from "../../../config/AxiosInstance";
import { useTweet } from "../../hooks/useTweet";
import * as ImagePicker from "expo-image-picker";
import ImageGrid from "../../components/ImageGrid";
import { uploadImageToCloudinary } from "../../../utils/uploadToCloudinary";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../../store/authContext";

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

  const { auth } = useAuth();
  const [tweet, setTweet] = useState("");
  const { refetchAllTweets } = useTweet();
  const [uploadedImage, setUploadedImage] = useState();

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
        allowsMultipleSelection: true,
        selectionLimit: 4,
        quality: 1,
      });

      if (!result.canceled) {
        setUploadedImage(result.assets);
      }
    } catch (err) {
      console.log("couldn't upload your images", err);
    }
  };

  const uploadFromCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();

      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        setUploadedImage(result.assets);
      }
    } catch (err) {
      console.log("couldn't upload your images", err);
    }
  };

  // upload image to cloudinary

  const createTweet = async () => {
    try {
      const uploadedImageUrls = await Promise.all(
        uploadedImage.map((image) => uploadImageToCloudinary(image))
      );

      mutate({ content: tweet, image: uploadedImageUrls });
    } catch (err) {
      console.log("couldn't send your tweets");
    }
  };

  const imageArr = uploadedImage?.map((image) => image.uri);

  return (
    <ScrollView className=" flex-1 px-4 py-2 bg-white  ">
      <View className="flex-1 flex-col  justify-between ">
        <View className="">
          <View className="flex flex-row justify-between mb-4">
            <Pressable onPress={() => navigation.goBack()} className="">
              <Text className="text-[16px]">Cancel</Text>
            </Pressable>

            <TouchableOpacity
              onPress={() => createTweet()}
              className={`bg-[#4C9EEB] px-4 py-2 rounded-full ${
                tweet?.length < 1 ? "opacity-40" : ""
              }`}
              disabled={Boolean(tweet?.length < 1)}
            >
              <Text className="text-white">Post</Text>
            </TouchableOpacity>
          </View>

          <View className=" ">
            <View className="flex flex-row gap-x-2 ">
              <Image
                className="w-[45px] h-[45px] object-cover rounded-full"
                src={
                  auth?.profile?.profile_picture ||
                  "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                }
              />

              <TextInput
                placeholder="What's happening?"
                className="flex-1 "
                value={tweet}
                autoFocus
                multiline
                maxLength={200}
                onChangeText={(text) => setTweet(text)}
              />
            </View>

            <View className="my-8">
              {imageArr?.length > 0 && <ImageGrid images={imageArr} />}
            </View>
          </View>
        </View>

        <View className="flex flex-row justify-end mt-6 gap-4 ">
          <TouchableOpacity
            onPress={() => uploadeFromFilePicker()}
            className="flex items-center flex-row gap-2"
          >
            <Entypo name="image" size={24} color="#4C9EEB" />
            <Text className="text-gray-500 text-xs">Upload images</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => uploadFromCamera()}
            className="flex items-center flex-row gap-2"
          >
            <Feather name="camera" size={24} color="#4C9EEB" />

            <Text className="text-gray-500 text-xs">Upload from camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
