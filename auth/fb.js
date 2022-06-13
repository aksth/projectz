import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
  signOut,
} from 'firebase/auth';
import * as Facebook from 'expo-facebook';
import { removeFromStore, saveToStore } from '../storage/store';

/* // Listen for authentication state to change.
onAuthStateChanged(auth, user => {
  if (user != null) {
    console.log('We are authenticated now!');
    //console.log(user);
  }
  // Do other things
}); */

async function loginWithFacebook(callback) {

  const auth = getAuth();

  await Facebook.initializeAsync({appId: '628756465508369', appName:'projectz'});

  const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ['public_profile', 'email'],
  });

  if (type === 'success') {

    console.log("####### faceook app login success ########");
    //console.log(token);

    // Build Firebase credential with the Facebook access token.
    // const facebookAuthProvider = new FacebookAuthProvider();
    const credential = FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    const userCredential = await signInWithCredential(auth, credential).catch(error => {
      console.log(error);
      // Handle Errors here.
    });
    console.log("####### firebase facebook auth login success ########");
    //console.log(userCredential);
    await saveToStore('email', userCredential._tokenResponse.email);
    await saveToStore('loggedIn', 'true');
    await saveToStore('idToken', userCredential._tokenResponse.idToken);
    await saveToStore('fullName', userCredential._tokenResponse.fullName);
    callback();
  } else {
    console.log('facebook login error.');
  }
}

async function signOutFacebook(callback) {
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('sign out successful.');
    removeFromStore('email');
    removeFromStore('loggedIn');
    removeFromStore('idToken');
    removeFromStore('fullName');
    callback();
  }).catch((error) => {
    // An error happened.
    console.log('sign out error.');
  });
}

export { loginWithFacebook, signOutFacebook };