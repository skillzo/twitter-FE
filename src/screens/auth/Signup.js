import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useMemo, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useMutation } from "react-query";
import { useAuth } from "../../../store/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "../../../config/AxiosInstance";

export default function SignUp({ navigation }) {
  const { setAuth } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });

  const { mutate } = useMutation(
    async (data) => axiosInstance.post("/auth/signup", data),
    {
      onSuccess: async (response) => {
        console.log("sign up res", response);
        await AsyncStorage.setItem(
          "twitter-auth",
          JSON.stringify(response?.data?.data)
        );

        setAuth(response?.data);
        // navigation.navigate("main");
      },
      onError: (err) => {
        Alert.alert("Error", err?.response?.data?.message);
      },
    }
  );

  const isDisabled = useMemo(
    () =>
      credentials?.password?.length < 1 ||
      credentials?.username?.length < 1 ||
      credentials?.email?.length < 1,
    [credentials]
  );

  return (
    <View className="bg-white flex-1">
      <View className="pt-[30%]  flex justify-center items-center ">
        <AntDesign name="twitter" size={40} color="#4C9EEB" />

        <View className=" w-[90%] mx-auto mt-8">
          <Text className="font-semibold text-[20px] text-center">
            Sign up to Twitter
          </Text>

          <View className="mt-4 space-y-6">
            <View>
              <TextInput
                value={credentials.username}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, username: text })
                }
                autoCapitalize="none"
                placeholder="Username"
                className="w-full bg-gray-100 rounded py-3 px-4"
              />
              {/* <Text className="text-rose-600 ml-2 text-xs mt-1">
                Enter your Username
              </Text> */}
            </View>

            <View>
              <TextInput
                value={credentials.email}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, email: text })
                }
                autoCapitalize="none"
                textContentType="emailAddress"
                placeholder="Emial "
                className="w-full bg-gray-100 rounded py-3 px-4"
              />
              {/* <Text className="text-rose-600 ml-2 text-xs">
                Enter your Email
              </Text> */}
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
              {/* <Text className="text-rose-600 ml-2">Enter your Password</Text> */}
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
            <Text className="text-white text-center font-medium"> Sign Up</Text>
          </TouchableOpacity>

          <View className="flex flex-row justify-center item-center gap-x-2  ">
            <Text className="  text-gray-500 tex">
              Already have an account?
            </Text>

            <Pressable onPress={() => navigation.navigate("login")}>
              <Text className="  font-medium text-m-blue">Sign In</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
