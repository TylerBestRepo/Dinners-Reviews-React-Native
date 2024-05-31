import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyDLx-gMyR3c9KW5-y5wvhD20FkTaaF3k10",
    authDomain: "dinner-reviews.firebaseapp.com",
    databaseURL: "https://dinner-reviews-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dinner-reviews",
    storageBucket: "dinner-reviews.appspot.com",
    messagingSenderId: "18080028640",
    appId: "1:18080028640:web:478f1d78e00aeb6d9cbd85",
    measurementId: "G-EJXPLPT8L3"
};

// // Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);

const FIREBASE_DB = getFirestore(FIREBASE_APP);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(AsyncStorage)
  });

export {
    FIREBASE_APP,
    FIREBASE_DB,
    FIREBASE_AUTH,
    GoogleAuthProvider
};