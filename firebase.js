import { initializeApp } from 'firebase/app';
import { googleApiKey } from './apikeys';
// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: googleApiKey,
  authDomain: "projectz-5f4d9.firebaseapp.com",
  databaseURL: "https://projectz-5f4d9-default-rtdb.firebaseio.com",
  projectId: "projectz-5f4d9",
  storageBucket: "projectz-5f4d9.appspot.com",
  messagingSenderId: "149811381771",
  appId: "1:149811381771:web:613d176b879a60a98be90e",
  measurementId: "G-36YLMLF8K9"
};

const initializeDb = () => {
  console.log("Initializing Firebase App");
  initializeApp(firebaseConfig);
  console.log("Initialized Firebase App");
}

export { initializeDb };