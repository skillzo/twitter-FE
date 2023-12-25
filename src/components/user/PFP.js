import React from "react";
import { Image } from "react-native";

export default function PFP({ styleProps }) {
  return (
    <Image
      className={` w-[35px] h-[35px] object-cover rounded-full ${styleProps}`}
      source={{
        uri: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
      }}
    />
  );
}
