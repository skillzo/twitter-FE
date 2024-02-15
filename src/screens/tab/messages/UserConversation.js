import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MessageText from "../../../components/messages/MessageText";
import { io } from "socket.io-client";
import { useAuth } from "../../../../store/authContext";
import { TextInput } from "react-native-gesture-handler";
import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "../../../../config/AxiosInstance";

export default function UserConversation({ navigation }) {
  useEffect(() => {
    navigation.getParent()?.setOptions({ headerShown: false });
    return () => navigation.getParent()?.setOptions({ headerShown: undefined });
  }, [navigation]);

  const socket = useRef();
  const scrollViewRef = useRef();
  const { auth } = useAuth();
  const [refreshWs, setRefreshWs] = useState(false);
  const [socketTyping, setSocketTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [liveMessages, setLiveMessages] = useState([]);

  useEffect(() => {
    socket.current = io("http://localhost:80/");
    socket.current.emit("addUser", { userId: auth?.id });
    socket.current.on("getMessage", (msg) => {
      setLiveMessages([...liveMessages, msg]);
    });

    socket.current.on("userIstyping", (isTypingdata) => {
      setSocketTyping(isTypingdata.isTyping);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [refreshWs, socket.current]);

  useEffect(() => {
    socket.current.emit("isTyping", { isTyping });
  }, [userMessage]);

  // api calls
  const { data: message, refetch } = useQuery(
    "/api/message",
    async () => {
      return axiosInstance.get("/api/message/65b6a173d68bbca5d5261aa0");
    },
    {
      onSuccess: (res) => {
        setLiveMessages(res?.data);
      },
    }
  );

  const { mutate } = useMutation(
    (data) => {
      axiosInstance.post("/api/message/create", data);
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const sendMessage = () => {
    if (userMessage === "") return false;
    mutate({
      conversationId: "65b6a173d68bbca5d5261aa0",
      sender: auth?.id,
      text: userMessage,
    });
    socket.current.emit("setMessage", {
      conversationId: "65b6a173d68bbca5d5261aa0",
      sender: auth?.id,
      text: userMessage,
    });
  };
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  return (
    <View className="flex-1 bg-white">
      <View className="pb-2 border-b border-gray-300">
        <View className="flex flex-row justify-between items-center px-3 pb-2 ">
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>

          <View className="flex items-center">
            <Image
              className="w-[30px] h-[30px] object-cover rounded-full"
              source={{
                uri: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
              }}
            />
          </View>

          <Pressable>
            <Ionicons name="settings-outline" size={24} color="black" />
          </Pressable>
        </View>

        <Text className="font-[700] text-sm] mt-[1px] text-center">
          AlwaysAngry
        </Text>
      </View>

      {/* <KeyboardAvoidingView
        behavior="position"
        // className="flex-1 bg-white"
        keyboardVerticalOffset={keyboardVerticalOffset}
      > */}
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
        className="px-4 py-[20em] "
      >
        {liveMessages?.map((msg) => {
          return (
            <MessageText
              key={msg._id}
              text={msg.text}
              user={auth?.id === msg.sender}
            />
          );
        })}

        {socketTyping && (
          <Image
            className="h-[40px] w-[70px] object-cover"
            source={require("../../../../assets/images/typing.gif")}
          />
        )}
      </ScrollView>

      <View className="flex flex-row border-t border-slate-300 bg-gray-50">
        <TextInput
          className="w-[80%]  py-2 px-4"
          autoFocus
          placeholder="Send message"
          onChangeText={(text) => {
            setUserMessage(text);
            text.length > 1 ? setIsTyping(true) : setIsTyping(false);
          }}
        />
        <TouchableOpacity
          onPress={() => sendMessage()}
          className="bg-m-blue px-6 py-3 rounded-lg flex items-center justify-center"
        >
          <Text className="text-white">Send</Text>
        </TouchableOpacity>
      </View>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
}
