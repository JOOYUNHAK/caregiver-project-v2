import AsyncStorage from '@react-native-async-storage/async-storage';
import app from './config';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export {auth};