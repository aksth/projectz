import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginWithFacebook, signOutFacebook } from '../auth/fb';
import { getValueFromStore } from '../storage/store';

function SettingsTab() {

  const [state, setState] = useState({
    loggedIn: false,
    email: '',
    fullName: '',
    oauthAccessToken: '',
    photoUrl: '',
  });

  const login = () => {
    loginWithFacebook(() => {
      getValue();
    })
  }

  const signOut = () => {
    signOutFacebook(() => {
      setState({loggedIn: false, email: '', fullName: '', oauthAccessToken: '', photoUrl: ''});
    });
  };

  const getValue = async () => {
    let val = {...state, loggedIn: true};
    await getValueFromStore('email', (value) => {
      val = {...val, email: value};
    });
    await getValueFromStore('fullName', (value) => {
      val = {...val, fullName: value};
    });
    await getValueFromStore('oauthAccessToken', (value) => {
      val = {...val, oauthAccessToken: value};
    });
    await getValueFromStore('photoUrl', (value) => {
      val = {...val, photoUrl: value+'?width=200&height=200&access_token='+val.oauthAccessToken};
      console.log(val);
    });
    setState({...state, ...val});
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View>
        {state.loggedIn &&
        <View>
          <Image
            style={{width: 100, height: 100, alignSelf: 'center', borderRadius: 10}}
            source={{uri: decodeURIComponent(state.photoUrl)}}
          />
          <Text style={{alignSelf: 'center'}}>Full Name: {state.fullName}</Text>
          <Text style={{alignSelf: 'center'}}>Email: {state.email}</Text>
        </View>        
        }
        {!state.loggedIn &&
        <View style={{alignItems: 'center', backgroundColor: '#1877f2', borderRadius: 15}}>
          <TouchableOpacity
          onPress={login}
          style={{paddingRight: 20, flexDirection: 'row', alignItems: 'center'}}
          >
            <Image
            style={{width: 50, height: 50}}
            source={require('../assets/fb-logo.png')}
            />
            <Text style={{color: 'white'}}>Login with Facebook!</Text>
          </TouchableOpacity>
        </View>
        }
        {state.loggedIn &&
        <TouchableOpacity
          onPress={signOut}
          style={{backgroundColor: 'wheat', padding: 10, alignItems: 'center'}}
        >
          <Text style={{}}>Sign Out!</Text>
        </TouchableOpacity>
        }
      </View>
    </SafeAreaView>
  );

}

export default SettingsTab;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/* <TouchableOpacity
          onPress={getValue}
          style={{backgroundColor: 'lightgreen', padding: 10, marginBottom: 50, marginTop: 50}}
        >
          <Text>Get Values</Text>
        </TouchableOpacity> */