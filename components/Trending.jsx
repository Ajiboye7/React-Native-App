import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { ZoomIn } from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native'


const zoomIn ={
  0:{
    scale: 0.9
  },
  1:{
    scale:1,
  }
}

const zoomOut ={
  0:{
    scale: 1
  },
  1:{
    scale:0.9,
  }
}



const TrendingItems = ({activeItem, item})=>{

  const [play, setPlay] = useState(false);
  return(
    <Animatable.View
    className="mr-5"
    animation={activeItem === item.$id ? zoomIn : zoomOut }
    duration={500}
    >
    {play ?(
      <Text className="text-white">Playing</Text>
    ): (
      <TouchableOpacity  className="relative justify-center items-center">

      </TouchableOpacity>
    )}
    </Animatable.View>
  )
}



const Trending = ({posts}) => {
  const [activeItem, setActiveItem] = useState(posts[0]);
  return ( 
    <FlatList
      data={posts}
      keyExtractor={(item)=> item.$id}
      renderItem={({item})=>(
       <TrendingItems activeItem={activeItem} item={item}/>
      )}
      horizontal
    />
  )
}

export default Trending