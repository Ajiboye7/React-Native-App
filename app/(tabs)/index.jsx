import { Text, View } from 'react-native';
import Test from './Test'
import { Link } from 'expo-router';
export default function HomeScreen() {
  return (
    <View className="flex items-center justify-center bg-white">
      <Text className="text-3xl mb-10 font-extrabold">How are you?</Text>
      <Test/>
      <Link href="/profile" style={{color: 'blue'}}>Go to profile</Link>
    </View>
  );
}

