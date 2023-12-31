import React from "react";
import { Image } from "react-native";
import { useAuth } from "../../../store/authContext";

export default function PFP({ styleProps }) {
  const { auth } = useAuth();

  return (
    <Image
      className={` w-[35px] h-[35px] object-cover rounded-full ${styleProps}`}
      source={{
        uri:
          auth?.profile?.profile_picture ||
          "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png",
      }}
    />
  );
}
