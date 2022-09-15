import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './navigations/StackNavigation';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import store from './redux/store';

export default function App() {

  return (
    <Provider store={store}>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
    </Provider>

  );
}

