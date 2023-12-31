import {
  View,
  Text,
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";

export default function TweetSlug({ navigation }) {
  return (
    <ScrollView>
      <View className="flex-1 bg-white px-4 pt-3 space-y-12 flex justify-between">
        <KeyboardAvoidingView className="space-y-6">
          <View className="flex flex-row items-center gap-x-2">
            <Image
              className="w-[50px] h-[50px] object-cover rounded-full"
              source={{
                uri: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
              }}
            />

            <View>
              <Text className="font-semibold text-[16px]">Komol Kuchkarov</Text>
              <Text className="text-gray-400">@kkuchkarov</Text>
            </View>
          </View>

          <Text className="text-xl font-[300]">
            Quickly create a low-fi wireframe version of your web projects with
            ready-to-use layouts of Scheme Constructor. Quickly create a low-fi
            wireframe version of your web projects with ready-to-use layouts of
            Scheme Constructor. Quickly create a low-fi wireframe version of
            your web projects with ready-to-use layouts of Scheme Constructor.
            Quickly create a low-fi wireframe version of your web projects with
            ready-to-use layouts of Scheme Constructor.
          </Text>
          <Text className="text-xl font-[300]">
            Quickly create a low-fi wireframe version of your web projects with
            ready-to-use layouts of Scheme Constructor. Quickly create a low-fi
            wireframe version of your web projects with ready-to-use layouts of
            Scheme Constructor. Quickly create a low-fi wireframe version of
            your web projects with ready-to-use layouts of Scheme Constructor.
            Quickly create a low-fi wireframe version of your web projects with
            ready-to-use layouts of Scheme Constructor.
          </Text>

          <Image
            className="w-full h-[300px] object-cover rounded-lg"
            source={{
              uri: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
            }}
          />
        </KeyboardAvoidingView>

        <TextInput
          placeholder="Post your reply"
          className="bg-gray-100 rounded-full py-3 px-4"
        />
      </View>
    </ScrollView>
  );
}
