/* 가게 홍보 리스트가 있는 페이지 */

import React, { useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import StatusBarComponent from '../components/StatusBarComponent';
import HelperList from '../components/FindHelper/HelperList';
import SearchBtn from '../components/Btn/SearchBtn';


export default function FindHelper({ navigation }) {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SearchBtn />
      )
    });
  }, [navigation])

  //테스트 세팅
  const [helperProfile, setHelperProfile] = useState( 

  [
    { listNo: 1, keyword1: '섬세한', keyword2: '꼼꼼한', keyword3: '대학병원', career : '2년미만', country: '한국', startWork: '바로가능' , sex: '남', age : 24, weight: 55, pay: '14~16', grade: 3.8, review: 10, view: 10 },
    { listNo: 2, keyword1: '다정한', keyword2: '욕창', keyword3: '전문', career : '3개월', sex: '여', age: 40, startWork: '2주뒤부터',weight: 60, pay: '11~12', grade: 4.8, review: 12, view: 8 },
    { listNo: 3, keyword1: '섬세한', keyword2: '잠실', keyword3: '전지역', career : '2개월', sex: '여', age: 42, startWork: '하루뒤부터',weight: 65,pay: '10~11', grade: 5.0,review: 24, view: 7 },
    { listNo: 4, keyword1: '상냥', keyword2: '친절', keyword3: '약속', career : '1년미만', sex: '여',age: 35, startWork: '3주뒤부터', weight: 52,pay: '8~10', grade: 4.5,review: 14, view: 124 },
    { listNo: 5, keyword1: '힘넘침', keyword2: '믿음', keyword3: '신뢰', career : '1년이상', sex: '여', age: 34, startWork: '한달뒤부터',weight: 56,pay: '11~12', grade: 4.3,review: 12, view: 32 },
    { listNo: 6, keyword1: '전문', keyword2: '많은경험', keyword3: '종합병원', career : '8개월', sex: '남', age: 46, startWork: '2달뒤부터',weight: 62,pay: '6~7',grade: 1.6, review: 6, view: 53 },
    { listNo: 7, keyword1: '순발력', keyword2: '뇌졸증', keyword3: '대학병원', career : '1년미만', sex: '여', age: 62, startWork: '1년뒤부터',weight: 59,pay: '10~11', grade: 2.5,review: 23, view: 23 },
  ] );


  //처음 렌더링 될 때 이성의 글만 목록 받아와서 UserProfile에 세팅한다음 정보 넘겨주기

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <HelperList navigation = {navigation} data = {helperProfile}/>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
  },
});
