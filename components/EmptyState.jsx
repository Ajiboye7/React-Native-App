import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({subtitle, title}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-sm text-white">
        {title}
      </Text>
      <Text className="font-psemibold text-white text-xl">{subtitle}</Text>
      <CustomButton
        title="Create a video"
        handlePress={()=> router.push('/create')}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
