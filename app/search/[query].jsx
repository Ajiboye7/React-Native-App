/*import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  const {query} = useLocalSearchParams();

  return (
    <SafeAreaView className="h-full">
      <Text className="text-3xl text-white">{query}</Text> 
    </SafeAreaView>
  )
}

export default Search*/
import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, R } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { SearchPosts } from "../../library/appwrite";
import useAppwrite from "../../library/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = ({ initialQuery }) => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(()=>SearchPosts(query));

  console.log(query, posts)
  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        //data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm  text-white">
              Search Results
            </Text>
            <Text className="font-psemibold text-white text-2xl">
            {query}
            </Text>
            <View className="mt-6 mb-8">
            <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
