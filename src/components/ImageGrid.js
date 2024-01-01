import { View, Text, Image } from "react-native";
import React from "react";

export default function ImageGrid({ images, styleprops }) {
  return (
    <View className={`h-[200px] ${styleprops}`}>
      {/* one image  */}
      {images?.length === 1 && (
        <Image
          className="w-full h-full object-cover rounded-xl "
          src={images[0]}
        />
      )}

      {/* two images */}
      {images?.length === 2 && (
        <View className="flex flex-row  flex-1 justify-between">
          <Image
            className="w-[49%] h-full  object-cover rounded-l-xl "
            src={images[0]}
          />

          <Image
            className="w-[49%] h-full  object-cover rounded-r-xl   "
            src={images[1]}
          />
        </View>
      )}

      {/* three images */}
      {images?.length === 3 && (
        <View className=" flex flex-row  flex-1 justify-between">
          <Image
            className="w-[49%] h-full  object-cover rounded-l-xl "
            src={images[0]}
          />

          <View className="w-[49%] h-full  object-cover rounded-r-xl  space-y-1.5 ">
            <Image
              className="w-full h-[49%]  object-cover rounded-tr-xl  "
              src={images[1]}
            />

            <Image
              className="w-full h-[49%]  object-cover rounded-br-xl  "
              src={images[2]}
            />
          </View>
        </View>
      )}

      {/* four images */}

      {images?.length === 4 && (
        <View className=" flex flex-row  flex-1 justify-between">
          <View className="w-[49%] h-full  object-cover rounded-r-xl  space-y-1.5 ">
            <Image
              className="w-full h-[49%]  object-cover rounded-tl-xl  "
              src={images[0]}
            />

            <Image
              className="w-full h-[49%]  object-cover rounded-bl-xl  "
              src={images[1]}
            />
          </View>

          <View className="w-[49%] h-full  object-cover rounded-r-xl  space-y-1.5 ">
            <Image
              className="w-full h-[49%]  object-cover rounded-tr-xl  "
              src={images[2]}
            />

            <Image
              className="w-full h-[49%]  object-cover rounded-br-xl  "
              src={images[3]}
            />
          </View>
        </View>
      )}
    </View>
  );
}
