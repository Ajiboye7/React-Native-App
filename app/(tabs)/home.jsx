import { StyleSheet, Text, View, FlatList, Image} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";

const Home = () => {
  return (
            </View>
            <View className='mt-i.5'>
            <Image
              source={images.logoSmall}
              className="w-9 h-10"
              resizeMode="contain"
            />
            </View>
            </View>
            <SearchInput/>

            <View className="w-full flex-1 pt-5 pb-8">
               <Text className='text-gray-100 text-lg font-pregular mb-3'>
                Latest Videos
               </Text>
               <Trending posts={[{id:1}, {id:2}, {id:3}] ?? []}/>
            </View>
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState 
            title= "No videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
