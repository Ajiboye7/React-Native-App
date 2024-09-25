import { Text, View,Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { TouchableOpacity } from "react-native";
humbnail.uri}}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-4 h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image 
                source={icons.upload}
                resizeMode="contain"
                className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
                </View>
          
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default create;
