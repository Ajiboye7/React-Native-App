
import React, { useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { getUserPosts} from "../../library/appwrite";
import useAppwrite from "../../library/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";
import {useGlobalContext} from '../../context/GlobalProvider'

const Profile = () => {
  const {user, setUser, setIsLoggedIn} = useGlobalContext()
  const { query } = useLocalSearchParams();
  const { data: posts } = useAppwrite(() => {
    if (user && user.$id) {
      return getUserPosts(user.$id);
    }
    return []; // Return an empty array or handle gracefully if user is not yet available
  });

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
            {/*{query}*/}
            </Text>
            <View className="mt-6 mb-8">
            {/*<SearchInput initialQuery={query} />*/}
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

export default Profile;
