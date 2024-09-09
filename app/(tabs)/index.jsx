import { Text, View } from 'react-native';
import { Link } from 'expo-router';
export default function HomeScreen() {
  return (
    <View className="flex items-center justify-center bg-white">
      <Text className="text-3xl mb-10 font-extrabold">How are you?</Text>
      <Link href="/home" style={{color: 'blue'}}>Go to Home</Link>
    </View>
  );
}

