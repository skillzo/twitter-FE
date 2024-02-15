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
  const { refetchAllTweets } = useTweet();
  const [uploadedImage, setUploadedImage] = useState();

  const { mutate, isLoading } = useMutation(
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
                source={{
                  uri: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
                }}
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

// let res = {
//   assets: [
//     {
//       assetId: "65206C1B-7BF2-40BE-9620-7AC3DCCABB46/L0/001",
//       base64: null,
//       duration: null,
//       exif: null,
//       fileName: "IMG_0010.jpg",
//       fileSize: 23609,
//       height: 438,
//       type: "image",
//       uri: "file:///Users/macbookprom1/Library/Developer/CoreSimulator/Devices/A58F1BAF-B936-4961-8A1D-7DDD796C8367/data/Containers/Data/Application/1277DDAB-56A3-483B-B888-1EF9B092C1B6/Library/Caches/ExponentExperienceData/%2540anonymous%252Ftwitter-frontend-6b3f511d-d9b5-4ce1-845c-92c818f366ea/ImagePicker/4175E287-62C4-4BCE-8CFB-AA265EF9F4F8.jpg",
//       width: 701,
//     },
//     {
//       assetId: "D84CE3DF-3266-4EB1-B307-3A2B7097E927/L0/001",
//       base64: null,
//       duration: null,
//       exif: null,
//       fileName: "IMG_0009.jpg",
//       fileSize: 24004,
//       height: 480,
//       type: "image",
//       uri: "file:///Users/macbookprom1/Library/Developer/CoreSimulator/Devices/A58F1BAF-B936-4961-8A1D-7DDD796C8367/data/Containers/Data/Application/1277DDAB-56A3-483B-B888-1EF9B092C1B6/Library/Caches/ExponentExperienceData/%2540anonymous%252Ftwitter-frontend-6b3f511d-d9b5-4ce1-845c-92c818f366ea/ImagePicker/B78C8723-5DA4-45AD-BB8F-2C947D12E2F8.jpg",
//       width: 640,
//     },
//     {
//       assetId: "6A5EC688-9979-444F-9904-3646F3E21AA6/L0/001",
//       base64: null,
//       duration: null,
//       exif: null,
//       fileName: "IMG_0008.jpg",
//       fileSize: 26774,
//       height: 640,
//       type: "image",
//       uri: "file:///Users/macbookprom1/Library/Developer/CoreSimulator/Devices/A58F1BAF-B936-4961-8A1D-7DDD796C8367/data/Containers/Data/Application/1277DDAB-56A3-483B-B888-1EF9B092C1B6/Library/Caches/ExponentExperienceData/%2540anonymous%252Ftwitter-frontend-6b3f511d-d9b5-4ce1-845c-92c818f366ea/ImagePicker/44FF91A0-DD34-4B6E-B228-D0906C3254D7.jpg",
//       width: 480,
//     },
//     {
//       assetId: "869EF714-DE38-4223-B200-2DEB9457F7A6/L0/001",
//       base64: null,
//       duration: null,
//       exif: null,
//       fileName: "IMG_0007.jpg",
//       fileSize: 22020,
//       height: 480,
//       type: "image",
//       uri: "file:///Users/macbookprom1/Library/Developer/CoreSimulator/Devices/A58F1BAF-B936-4961-8A1D-7DDD796C8367/data/Containers/Data/Application/1277DDAB-56A3-483B-B888-1EF9B092C1B6/Library/Caches/ExponentExperienceData/%2540anonymous%252Ftwitter-frontend-6b3f511d-d9b5-4ce1-845c-92c818f366ea/ImagePicker/1103A052-C38F-4DA0-921E-59A386FB7FAD.jpg",
//       width: 640,
//     },
//   ],
//   canceled: false,
//   cancelled: false,
// };

// [
//   "file:///Users/macbookprom1/Library/Developer/CoreSimulator/Devices/A58F1BAF-B936-4961-8A1D-7DDD796C8367/data/Containers/Data/Application/1277DDAB-56A3-483B-B888-1EF9B092C1B6/Library/Caches/ExponentExperienceData/%2540anonymous%252Ftwitter-frontend-6b3f511d-d9b5-4ce1-845c-92c818f366ea/ImagePicker/18C38454-E354-4436-87D4-A8C985A162BA.jpg",
//   "file:///Users/macbookprom1/Library/Developer/CoreSimulator/Devices/A58F1BAF-B936-4961-8A1D-7DDD796C8367/data/Containers/Data/Application/1277DDAB-56A3-483B-B888-1EF9B092C1B6/Library/Caches/ExponentExperienceData/%2540anonymous%252Ftwitter-frontend-6b3f511d-d9b5-4ce1-845c-92c818f366ea/ImagePicker/18C38454-E354-4436-87D4-A8C985A162BA.jpg",
//   "file:///Users/macbookprom1/Library/Developer/CoreSimulator/Devices/A58F1BAF-B936-4961-8A1D-7DDD796C8367/data/Containers/Data/Application/1277DDAB-56A3-483B-B888-1EF9B092C1B6/Library/Caches/ExponentExperienceData/%2540anonymous%252Ftwitter-frontend-6b3f511d-d9b5-4ce1-845c-92c818f366ea/ImagePicker/18C38454-E354-4436-87D4-A8C985A162BA.jpg",
//   "file:///Users/macbookprom1/Library/Developer/CoreSimulator/Devices/A58F1BAF-B936-4961-8A1D-7DDD796C8367/data/Containers/Data/Application/1277DDAB-56A3-483B-B888-1EF9B092C1B6/Library/Caches/ExponentExperienceData/%2540anonymous%252Ftwitter-frontend-6b3f511d-d9b5-4ce1-845c-92c818f366ea/ImagePicker/18C38454-E354-4436-87D4-A8C985A162BA.jpg",
// ];
