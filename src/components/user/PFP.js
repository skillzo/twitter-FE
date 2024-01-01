import React from "react";
import { Image } from "react-native";
import { useAuth } from "../../../store/authContext";

export default function PFP({ styleProps, user, pfp, url }) {
  const { auth } = useAuth();

  return (
    <Image
      className={` w-[35px] h-[35px] object-cover rounded-full ${styleProps}`}
      source={{
        uri: user
          ? auth?.profile?.profile_picture
          : pfp
          ? url
          : "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png",
      }}
    />
  );
}
