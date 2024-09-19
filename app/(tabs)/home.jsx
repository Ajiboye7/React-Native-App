import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import {getAllPosts} from "../../library/appwrite"
import useAppwrite from "../../library/useAppwrite";


const Home = () => {
  const { data: posts, refetch} = useAppwrite(getAllPosts)

  const[refreshing, setRefreshing] =useState(false);

  const onRefresh = async () =>{
    setRefreshing(true)
    // recall new videos if any new videos appeared 
    await refetch();

    setRefreshing(false)
  }

  


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        //data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-white text-3xl">{item.title}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm  text-white">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-white text-2xl">
                  Ajiboye
                </Text>
              </View>
              <View className="mt-i.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain" 
                />
              </View>
            </View>
            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
