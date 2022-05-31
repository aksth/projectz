import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "googleapikeyremoved",
  authDomain: "projectz-5f4d9.firebaseapp.com",
  databaseURL: "https://projectz-5f4d9-default-rtdb.firebaseio.com",
  projectId: "projectz-5f4d9",
  storageBucket: "projectz-5f4d9.appspot.com",
  messagingSenderId: "149811381771",
  appId: "1:149811381771:web:613d176b879a60a98be90e",
  measurementId: "G-36YLMLF8K9"
};

console.log("##########################################################");

const app = initializeApp(firebaseConfig);

export default app;