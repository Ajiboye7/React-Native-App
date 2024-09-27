import React, { useState } from "react";
import { Text, View, FlatList, Image, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import {getAllPosts,getLatestPosts} from "../../library/appwrite"
import useAppwrite from "../../library/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";



const Home = () => {
  const { data: posts, refetch} = useAppwrite(getAllPosts)
  const { data: Latestposts} = useAppwrite(getLatestPosts)
  const[refreshing, setRefreshing] =useState(false);
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const onRefresh = async () =>{
    setRefreshing(true)

    await refetch();

    setRefreshing(false) 
  }

  
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        //data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video ={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm  text-white">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-white text-2xl">
                  {user?.username}
              
    </SafeAreaView>
  );
};

export default Home;

