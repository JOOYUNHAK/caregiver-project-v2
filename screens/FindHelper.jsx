/* 가게 홍보 리스트가 있는 페이지 */

import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { AppState } from 'react-native';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import HelperList from '../components/FindHelper/HelperList';
import StatusBarComponent from '../components/StatusBarComponent';
import { getLoginState, validateToken } from '../functions/Token';

export default function FindHelper({ navigation }) {

  const appState = useRef(AppState.currentState);
  //앱 초기화면이 현재 페이지이므로
  //초기 로딩시에만 로그인 토큰 유효성 검사
  useEffect(() => {
    async function refreshLoginState() {
      if( await getLoginState() )
        await validateToken(navigation);
    }

    if(appState.current === 'active')
      refreshLoginState();
  }, []);
  /* useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const history = useNavigationState(state => state.history)  
      const isLogin = await getLoginState();
        
        if (isLogin) {
            await validateToken(navigation);
        }
    })
    return unsubscribe
  }, [navigation]) */

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
