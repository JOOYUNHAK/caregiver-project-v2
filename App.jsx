import React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { StackNavigation } from './navigations/StackNavigation';
import { Provider, useDispatch } from 'react-redux';
import 'react-native-gesture-handler';
import store from './redux/store';
import { socket } from './module/socket';
import { useEffect } from 'react';


export default function App() {
  useEffect(() => {
    socket.on('hi', () => {
      console.log('adsfj')
    })
    socket.on('private', (message) => {
      console.log(message)
    })
  }, [])
  return (
    <Provider store={store}>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
    </Provider>

  );
}

