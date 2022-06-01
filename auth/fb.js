import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
  signOut,
} from 'firebase/auth';
import * as Facebook from 'expo-facebook';

const auth = getAuth();

// Listen for authentication state to change.
onAuthStateChanged(auth, user => {
  console.log('auth state changed!')
  if (user != null) {
    console.log('We are authenticated now!');
    console.log(user);
  }

  // Do other things
});

async function loginWithFacebook() {
  await Facebook.initializeAsync('628756465508369');

  const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ['public_profile'],
  });

  if (type === 'success') {

    console.log("####### login success ########");
    console.log(token);

    // Build Firebase credential with the Facebook access token.
    // const facebookAuthProvider = new FacebookAuthProvider();
    const credential = FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    signInWithCredential(auth, credential).catch(error => {
      // Handle Errors here.
    });
  } else {
    console.log('facebook login error.');
  }
}

function signOutFacebook() {
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('sign out successful.');
  }).catch((error) => {
    // An error happened.
    console.log('sign out error.');
  });
}

export { loginWithFacebook, signOutFacebook };