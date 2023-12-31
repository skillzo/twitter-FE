import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useMemo, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useMutation } from "react-query";
import { base_url } from "../../../utils/variables";
import axios from "axios";
import { useAuth } from "../../../store/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp({ navigation }) {
  const { setAuth } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    display_name: "",
  });

  const { mutate } = useMutation(
    async (data) => axios.post(`${base_url}/auth/login`, data),
    {
      onSuccess: async (response) => {
        await AsyncStorage.setItem(
          "twitter-auth",
          JSON.stringify(response?.data?.data)
        );

        setAuth(response?.data);
        navigation.navigate("main");
      },
      onError: (err) => {
        Alert.alert("Error", err?.response?.data?.message);
      },
    }
  );
  const isDisabled = useMemo(
    () =>
      credentials?.password?.length < 1 || credentials?.username?.length < 1,
    [credentials]
  );

  return (
    <View className="bg-white flex-1">
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
                placeholder="email or username"
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
                placeholder="emial or username"
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

          <Pressable
          //  onPress={() => getItem()}
          >
            <Text className="text-center font-medium">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
