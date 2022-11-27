/* 가게 홍보 리스트가 있는 페이지 */

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { AppState } from 'react-native';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import HelperList from '../components/FindHelper/HelperList';
import StatusBarComponent from '../components/StatusBarComponent';
import { getLoginState, validateToken } from '../functions/Token';
import { socket, socketEvent } from '../module/socket';

export default function FindHelper({ navigation }) {

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  //앱 초기화면이 현재 페이지이므로
  //초기 로딩시에만 로그인 토큰 유효성 검사
  useEffect(() => {

    const subscription = AppState.addEventListener('change', nextAppState => {
      //app이 처음 실행 혹은 다시 켰을 때
      if (nextAppState === 'active') {
        refreshLoginState();
      } 
      else {
        console.log('disconnect')
        socketEvent(socket, 'disconnect');
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    })

    async function refreshLoginState() {
      //로그인이 성공적으로 이루어졌으면
      if( 
        await getLoginState() &&  
        await validateToken(navigation)
      ) {
          //socket 등록
          socketEvent(socket, 'reconnect');
          socketEvent(socket, 'off_new_message');
          socketEvent(socket, 'new_message');
          socketEvent(socket, 'check_application');
          socketEvent(socket, 'response_application');
          socketEvent(socket, 'newroom')
          socketEvent(socket, 'opponentJoin')
      }
    }

    return () => { subscription.remove() }

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
