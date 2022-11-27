/* 로그인 박스 프로필 부분 로그인 되어 있는 상태 */
import { CommonActions, StackActions } from '@react-navigation/native';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableHighlight
}
    from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import Icon from '../../Icon';

export default function LoginProfile({ navigation }) {
    const { name, purpose } = useSelector(state => ({
        name: state.user.name,
        purpose: state.user.purpose
    }));

    return (
        <TouchableHighlight
            underlayColor='none'
            onPress={() => navigation.dispatch(
                StackActions.push('myProfilePage')
            )}
            style={{ height: '49%' }}>
            <View style={styles.myLoginState}>
                    <Icon props={['material', 'account-circle', 60, '#eaebe8']} />
                <View style={styles.userNameAndPurpose}>
                    
                    <Text style={styles.myLoginBoxText}>
                        {name}님, 반갑습니다
                    </Text>
            
                
                </View>
                
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
        fontSize: Platform.OS === 'ios' ? 17 : 17,
        color: '#94c6ad',
        fontWeight: '600'
    },

    userNameAndPurpose: { 
        width: '70%', 
        justifyContent: 'center', 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        marginTop: 5 
    }
})