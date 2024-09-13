import { Text, View,Image,ScrollView, Alert } from 'react-native'
import {React,  useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from "../../components/CustomButton";
import { Link, router } from 'expo-router'
import {createUser} from '../../library/appwrite'

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const submit = async ()=>{
    if(!form.email || !form.password || !form.username){
      Alert.alert('Error', "please fill in all the fields")
      return;
    }

    setIsSubmitting(true);

    try{
      const result = await createUser(form.email, form.password, form.username)

      //set to global state

      router.replace('/home');
    }catch(error){
      Alert.alert('Error', error.message)
    }finally{
      setIsSubmitting(false)
    }
   // return result 
  }
   
  return (
    <SafeAreaView className="bg-primary h-full px-3">
       <ScrollView>
        <View className="w-full justify-center min-h-[85vh]">
        <Image
          source={images.logo}
          resizeMode='container'
          className="w-[115px] h-[35px]"
        /> 
        <Text className="text-2xl text-white font-psemibold mt-10">Sign Up to Aora</Text>

        <FormField
          title="Username"
          value={form.username}
          handleChangeText={(e)=>setForm({...form, username:e})}
          otherStyles="mt-10"
          placeholder="Your unique username"
        />

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
          title= "Sign Up"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
        /> 

        <View className="flex-row gap-2 justify-center pt-5">
          <Text className="text-lg text-gray-100 font-pregular">Already have an account?</Text>
          <Link href="/sign-in" className="text-secondary text-lg font-psemibold">Sign In </Link>
        </View>
        </View>
       </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
