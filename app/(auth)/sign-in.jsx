import { Text, View,Image,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from "../../components/CustomButton";
import { Link } from 'expo-router'

const SignIn = () => {
  const [form, setForm] = useState({
    email:'',
    password:''
  })

  const submit =()=>{

  }
  const [isSubmitting, setIsSubmitting] = useState(false)


  return (
    <SafeAreaView className="bg-primary h-full px-3">
       <ScrollView>
        <View className="w-full justify-center h-full">
        <Image
          source={images.logo}
          resizeMode='container'
          className="w-[115px] h-[35px]"
        /> 
        <Text className="text-2xl text-white font-psemibold mt-10">Log in to Aora</Text>

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e)=>setForm({...form, email:e})}
          otherStyles="mt-7"
          keyboardType= "email-address"
        />
        
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e)=>setForm({...form, password:e})}
          otherStyles="mt-7"
        />
        <CustomButton 
          title= "Sign In"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
        /> 

        <View className="flex-row gap-2 justify-center pt-5">
          <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
          <Link href="/sign-up" className="text-secondary text-lg font-psemibold">Sign Up </Link>
        </View>
        </View>
       </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
