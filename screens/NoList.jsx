/* 검색 결과나 홍보물이 없을 경우 */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform
} from 'react-native';

import * as Animatable from 'react-native-animatable';

export default function NoListPage(props) {
  const code = props.code;

  return (
    <View style={styles.NoListPage}>
      {code === 'noBoardList' ?
        <Animatable.View animation="fadeInDownBig">
          <Text style={styles.NoListText}>
            아직 등록한 보조사분들이 없어요!
          </Text>
        </Animatable.View>
        :
        <Text style={styles.NoRecentText}>
          최근에 검색한 단어가 없습니다.
        </Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  NoListPage: {
    flex: 1,
    height: 630,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingTop: 50
  },

  NoListText: {
    fontSize: Platform.OS === 'ios' ? 11 : 14,
    fontWeight: 'bold',
    color: 'silver'
  },

  NoRecentText: {
    color: 'silver',
    fontWeight: '600',
    paddingLeft: 20,
    fontSize: Platform.OS === 'ios' ? 11 : 14,
  }
});