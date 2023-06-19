/* 회원가입, 휴대폰 변경 버튼 */
import React from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
}
from 'react-native';
import { useDispatch } from 'react-redux';
import { reset } from '../../redux/action/login/loginAction';

export default function SubBtn({ navigation }) {
    const dispatch = useDispatch();
    const btnHandler = (path) => {

        if(path === 'register') {
            navigation.push('firstRegisterPage');
            setTimeout(() => {
                dispatch(reset());
            }, 300);
        }
    }
    return (
        <View style={styles.userAboutAccount}>
            <TouchableHighlight
                underlayColor='none'
                onPress={() => btnHandler('register')}
            >
                <Text style={{ color: 'darkgray' }}>
                    이용이 처음이신가요?
                </Text>
            </TouchableHighlight>
            <View style={styles.verticalLine} />
            <TouchableHighlight
                underlayColor='none'
                onPress={() => btnHandler('email')}
            >
                <Text style={{ color: 'darkgray' }}>
                    휴대폰 번호가 변경됐나요?
                </Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({

    userAboutAccount: {
        paddingTop: 20,
        flex: 7,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginHorizontal: 20,
        paddingLeft: 5
    },

    verticalLine: {
        borderWidth: 0.2,
        height: 15,
        marginHorizontal: 15,
        marginTop: 3,
        borderColor: 'silver'
    },
});