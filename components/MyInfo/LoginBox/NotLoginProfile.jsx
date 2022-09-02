/* 로그인 박스 프로필 부분 로그인 되어 있지 않은 상태 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableHighlight
}
    from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from '../../Icon';

export default function LoginProfile({ navigation }) {

    return (
        <TouchableHighlight
            underlayColor='none'
            onPress={() => navigation.push('loginPage')}
            style={{ height: '49%' }}>
            <View style={styles.myLoginState}>
                <Text style={styles.myLoginBoxText}>
                    로그인 및 회원가입하기
                </Text>
                <View style={{ position: 'absolute', right: 30 }}>
                    <Icon props={['material', 'navigate-next', 30, '#94c6ad']} />
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({

    myLoginState: {
        width: wp('100%'),
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 20,
        borderBottomWidth: 0.2,
        borderColor: '#cecece'
    },

    myLoginBoxText: {
        paddingLeft: 10,
        fontSize: Platform.OS === 'ios' ? 17 : 20,
        color: '#94c6ad',
    },
})