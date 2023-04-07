import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initializeAuth} from 'firebase/auth';
import {getReactNativePersistence} from 'firebase/auth/react-native';

const firebaseConfig = {
    apiKey: "AIzaSyDQaTUZKfbI1Im_dAKPcVuPoH2hCln98Hg",
    authDomain: "byfaith-9002c.firebaseapp.com",
    projectId: "byfaith-9002c",
    storageBucket: "byfaith-9002c.appspot.com",
    messagingSenderId: "607188552825",
    appId: "1:607188552825:web:04bb936e5b0c2ffc3998a8",
    measurementId: "G-ZWW2TMQ6VX"
  };

  const app = firebase.initializeApp(firebaseConfig);
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });

  export default firebase;