import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import app from './firebase';
import { writeUserData, getUserById } from './firebase/db';
import Test from './components/test';

export default function App() {
  
  //writeUserData("2", "hari", "hari1@gmail.com", "hariimage");
  console.log("user 1:");
  getUserById(1);
  return (
    <View style={styles.container}>
      <Test />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
