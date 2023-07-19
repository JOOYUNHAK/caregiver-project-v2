/* 가게 홍보 리스트가 있는 페이지 */

import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import HelperList from '../components/FindHelper/HelperList';
import StatusBarComponent from '../components/StatusBarComponent';

export default function FindHelper({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
        <HelperList purpose='careGiver'/>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
    backgroundColor: 'white',
  },
});
