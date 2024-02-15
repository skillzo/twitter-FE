import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useMemo, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useMutation } from "react-query";
import { useAuth } from "../../../store/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "../../../config/AxiosInstance";

export default function Login({ navigation }) {
  const { setAuth } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { mutate } = useMutation(
    async (data) => await axiosInstance.post("/auth/login", data),

    {
      onSuccess: async (response) => {
        await AsyncStorage.setItem(
          "twitter-auth",
          JSON.stringify(response?.data?.data)
        );

        setAuth(response?.data);
        // navigation.navigate("main");
      },
      onError: (err) => {
        Alert.alert("Error", err?.response?.data?.message);
        console.log("login error", err);
      },
    }
  );
  const isDisabled = useMemo(
    () =>
      credentials?.password?.length < 1 || credentials?.username?.length < 1,
    [credentials]
  );

  return (
    <KeyboardAvoidingView
      className="bg-white flex-1"
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <View className="pt-[30%]  flex justify-center items-center ">
        <AntDesign name="twitter" size={40} color="#4C9EEB" />

        <View className=" w-[90%] mx-auto mt-8">
          <Text className="font-semibold text-[20px] text-center">
            Log in to Twitter
          </Text>

          <View className="mt-4 space-y-6">
            <View>
              <TextInput
                value={credentials.username}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, username: text })
                }
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="username"
                className="w-full bg-gray-100 rounded py-3 px-4"
              />
              {/* <Text className="text-rose-600 ml-2">Enter your Username</Text> */}
            </View>

            <View>
              <TextInput
                secureTextEntry
                value={credentials.password}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, password: text })
                }
                autoCapitalize="none"
                placeholder="Password"
                className="w-full bg-gray-100 rounded py-3 px-4"
              />
              {/* <Text className="text-rose-600 ml-2">Enter your Username</Text> */}
            </View>
          </View>
        </View>

        <View className="mt-8 space-y-4 w-[90%]">
          <TouchableOpacity
            onPress={() =>
              mutate({
                ...credentials,
              })
            }
            className={`bg-m-blue rounded-full py-3 w-full ${
              isDisabled ? "opacity-30" : "opacity-100"
            }`}
            disabled={isDisabled}
          >
            <Text className="text-white text-center font-medium"> Log in</Text>
          </TouchableOpacity>

          <View className="flex flex-row justify-center item-center gap-x-2  ">
            <Text className="  text-gray-500 tex">Don't have an account?</Text>

            <Pressable onPress={() => navigation.navigate("sign-up")}>
              <Text className="  font-medium text-m-blue">Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
