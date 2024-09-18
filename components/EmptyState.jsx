import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";

const EmptyState = ({subtitle, title}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMethod="contain"
      />
      <Text className="font-pmedium text-sm text-white">
        {subtitle}
      </Text>
      <Text className="font-psemibold text-white text-2xl">{title}</Text>
    </View>
  );
};

export default EmptyState;
