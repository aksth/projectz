import * as SecureStore from 'expo-secure-store';

async function saveToStore(key, value) {
  await SecureStore.setItemAsync(key, value);
  console.log(key + ' saved!');
}

async function getValueFromStore(key, callback) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    callback(result);
  } else {
    console.log("Error getting value from store (getValueFromStore)");
    callback(null);
  }
}

async function removeFromStore(key) {
  await SecureStore.deleteItemAsync(key)
  console.log(key + ' removed!');
}

async function getAllValues(callback) {
  let email = await SecureStore.getItemAsync('email');
  let loggedIn = await SecureStore.getItemAsync('loggedIn');
  loggedIn = (loggedIn === 'true');
  let idToken = await SecureStore.getItemAsync('idToken');
  let fullName = await SecureStore.getItemAsync('fullName');
  let oauthAccessToken = await SecureStore.getItemAsync('oauthAccessToken');
  let photoUrl = await SecureStore.getItemAsync('photoUrl');
  let exponentPushToken = await SecureStore.getItemAsync('exponentPushToken');
  callback({
    email: email,
    loggedIn: loggedIn,
    idToken: idToken,
    fullName: fullName,
    oauthAccessToken: oauthAccessToken,
    photoUrl: photoUrl,
    exponentPushToken: exponentPushToken,
  });
}

export {saveToStore, getValueFromStore, removeFromStore, getAllValues};