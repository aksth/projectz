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

export {saveToStore, getValueFromStore, removeFromStore};