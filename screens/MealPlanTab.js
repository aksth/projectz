import { View, StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginWithFacebook, signOutFacebook } from '../auth/fb';
import { getValueFromStore } from '../storage/store';
import { useState } from 'react';

export default function MealPlanTab() {

  
  const [state, setState] = useState({
    loggedIn: false,
    email: '',
    fullName: '',
  });

  const login = () => {
    loginWithFacebook(() => {
      setState({loggedIn: true});
    })
  }

  const signOut = () => {
    signOutFacebook(() => {
      setState({loggedIn: false, email: '', fullName: ''});
    });
  };

  const getValue = async () => {
    let val = {...state};
    await getValueFromStore('email', (value) => {
      val = {...val, email: value};
    });
    await getValueFromStore('fullName', (value) => {
      val = {...val, fullName: value};
    });
    setState({...state, ...val});
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View>
        <View>
          <Text>Full Name: {state.fullName}</Text>
          <Text>Email: {state.email}</Text>
          <Text>Logged In: {state.loggedIn ? 'Yes' : 'No'}</Text>
        </View>
        {state.loggedIn &&
        <TouchableOpacity
          onPress={getValue}
          style={{backgroundColor: 'lightgreen', padding: 10, marginBottom: 50, marginTop: 50}}
        >
          <Text>Get Values</Text>
        </TouchableOpacity>
        }
        {!state.loggedIn &&
        <TouchableOpacity
          onPress={login}
          style={{backgroundColor: 'lightskyblue', padding: 10, marginBottom: 50}}
        >
          <Text>Login with Facebook!</Text>
        </TouchableOpacity>
        }
        <TouchableOpacity
          onPress={signOut}
          style={{backgroundColor: 'wheat', padding: 10}}
        >
          <Text>Sign Out!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});