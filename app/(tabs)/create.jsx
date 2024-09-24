import { Text, View,Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import FormField from "../../components/FormField";
import { TouchableOpacity } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { icons } from "../../constants";

const create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  return (
    <SafeAreaView className="h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your Video a catchy title"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity>
            {form.video ? (
              <Video 
                source={{uri: form.video.uri}}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-4 -40 px-4 bg-black-100 rounded-2xl justify-center items-center ">
                <View className="w-14 h-14 border-dashed border-secondary-100 justify-center items-center">
                <Image
                source={icons.upload}
                resizeMode="contain"
                className="w-1/2"
                />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2 ">
        <Text className="text-base text-gray-100 font-pmedium">
            Thumbnial Image
          </Text>
          <TouchableOpacity>
            {form.video ? (
              <Video 
                source={{uri: form.video.uri}}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-4 -40 px-4 bg-black-100 rounded-2xl justify-center items-center ">
                <View className="w-14 h-14 border-dashed border-secondary-100 justify-center items-center">
                <Image
                source={icons.upload}
                resizeMode="contain"
                className="w-1/2"
                />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default create;
