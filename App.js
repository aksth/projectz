import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import app from './firebase';
import { writeUserData, getUserById } from './firebase/db';
import Test from './components/test';
import { loginWithFacebook, signOutFacebook } from './auth/fb';

export default function App() {
  
  //writeUserData("2", "hari", "hari1@gmail.com", "hariimage");
  console.log("user 1:");
  getUserById(1);
  return (
    <View style={styles.container}>
      <Test />
      <Text>Open up App.js to start working on your app!</Text>
      <TouchableOpacity
        onPress={loginWithFacebook}
        style={{backgroundColor: 'lightskyblue', padding: 10, marginBottom: 10}}
      >
        <Text>Login with Facebook!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={signOutFacebook}
        style={{backgroundColor: 'wheat', padding: 10}}
      >
        <Text>Sign Out!</Text>
      </TouchableOpacity>
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
