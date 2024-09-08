import { StyleSheet, Text, View } from 'react-native';
import Test from './Test'
import { Link } from 'expo-router';
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>How are you?</Text>
      <Test/>
      <Link href="/Test" style={{color: 'blue'}}>Go to profile</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
