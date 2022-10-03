/* 검색 결과나 홍보물이 없을 경우 */
import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableHighlight } from 'react-native';
import {
  Text,
  View,
  StyleSheet,
  Platform
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from '../components/Icon';

export default function NoListPage(props) {
  const code = props.code;
  const navigation = useNavigation();
  return (
    <View style={styles.NoListPage}>
      {
        code === 'noBoardList' ?
          <View style = {{marginTop: 50, alignItems: 'center'}}>
            <Text style={styles.NoListText}>
              현재 찾을 수 있는 간병인이 없어요
            </Text>
            <Text style={{ color: '#7a7a7a', marginTop: 5 }}>
              선택하신 필터를 변경해보세요
            </Text>
            </View>
          :

          (
            code === 'noHeartList' ?
              <View style = {{marginTop: 50, alignItems: 'center'}}>
                <Icon props={['ionicon', 'heart-dislike-outline', 60, 'silver']} />
                <Text style={styles.NoListText}>
                  찜한 간병인이 없어요
                </Text>
                <Text style={{ color: '#7a7a7a', marginTop: 5, fontSize: 15 }}>
                  다시 보고싶은 간병인을 찜 해보세요
                </Text>
                </View>
              :
              (
                code === 'noLoginHeartList' ?
                  <View style = {{marginTop:50}}>
                    <Icon props={['feather', 'heart', 60, 'silver']} />
                    <View style={{ marginTop: 20, alignItems: 'center' }}>
                      <Text style={{ color: '#969091', fontSize: 17 }}>
                        로그인 이후에
                      </Text>
                      <Text style={{ color: '#969091', fontSize: 17 }}>
                        찜 목록을 확인해 주세요.
                      </Text>

                      <TouchableHighlight
                        underlayColor='none'
                        onPress={() => navigation.dispatch(
                          StackActions.push('loginPage')
                        )}
                        style={{
                          marginTop: 30,
                          borderWidth: 1,
                          width: widthPercentageToDP('65%'),
                          borderColor: '#0c2461',
                          borderWidth: 1.2,
                          borderRadius: 5,
                          paddingVertical: 10
                        }}
                      >
                        <Text 
                          style={{ fontSize: 16, fontWeight: '500', color: '#0c2461', textAlign: 'center' }}>
                          로그인
                        </Text>
                      </TouchableHighlight>
                    </View>
                  </View> 
                  :
                  <Text style={styles.NoRecentText}>
                    최근에 검색한 단어가 없습니다.
                  </Text>
              )
          )

      }
    </View >
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
    marginTop: 20,
    fontSize: Platform.OS === 'ios' ? 11 : 17,
    fontWeight: '400',
    color: 'black'
  },

  NoRecentText: {
    color: 'silver',
    fontWeight: '600',
    paddingLeft: 20,
    fontSize: Platform.OS === 'ios' ? 11 : 14,
  }
});