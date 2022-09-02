/* 로그인 페이지 아이디 인증 부분 */
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Text,
    Platform
}
    from 'react-native';
import { useDispatch } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import api from '../../config/CustomAxios';
import { saveId, saveIsAuthed } from '../../redux/action/register/firstRegisterAction';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUser } from '../../redux/action/user/userAction';
import { CommonActions } from '@react-navigation/native';


export default function AuthId({ navigation }) {
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setTimeout(() => {
                reset();
            }, 200);
        });
        return unsubscribe;
    }, [navigation]);

    const dispatch = useDispatch();

    const [id, setId] = useState('');
    const [isExceed, setIsExceed] = useState(false);
    const [btnText, setBtnText] = useState('인증번호 받기');
    const [infoMessage, setInfoMessage] = useState('');
    const [isSend, setIsSend] = useState(false); //인증번호를 보냈는지
    const [authCode, setAuthCode] = useState(''); //인증번호
    const [isNewUser, setIsNewUser] = useState(false); //로그인을 하는데 새로운 사람인지

    const requestAuthNumber = async () => {
        setAuthCode('');
        try {
            const res = await api.get(`/auth/login/${id}`);
            const status = res.data['status'];
            const message = res.data['message'];
            switch (status) {
                //기존 회원일 경우
                case 'exist':
                    setInfoMessage(message);
                    setBtnText('인증하기') //인증번호 받기 버튼 => 인증하기
                    setIsSend(true); //인증이 보내짐
                    break;
                //새로운 회원일 경우
                case 'newuser':
                    setInfoMessage(message);
                    setBtnText('인증하기');
                    setIsSend(true);
                    setIsNewUser(true);
                    break;
            }
        }
        catch (err) {
            const statusCode = err.response.data.statusCode;
            const message = err.response.data.message;
            switch (statusCode) {
                //네이버와 통신 불가
                case 500:
                    setInfoMessage(message);
                    break;
                //하루 인증횟수 초과
                case 403:
                    setInfoMessage(message);
                    setIsSend(false);
                    setIsExceed(true);
                    break;
            }
        }
    }

    const checkAuthCode = async () => {
        try {
            const res = await api.post('/auth/sms', {
                id: id,
                userInputCode: authCode,
                path: 'login',
                newUser: isNewUser ? true : false
            });
            const status = res.data.status;
            switch (status) {
                case 'success':
                    dispatch(saveIsAuthed(true));
                    if (isNewUser) {
                        setBtnText('인증번호 받기');
                        setIsSend(false);
                        setInfoMessage('');
                        setId('');
                        setAuthCode('')
                        navigation.replace('firstRegisterPage');
                        setTimeout(() => {
                            reset();
                        }, 200);
                    }
                    else {
                        const accessToken = res.data.accessToken; //accessToken 저장
                        const user = res.data.user;
                        const refreshToken = res.data.user.token_index; //refreshToken index 저장
                        dispatch(saveUser(user));
                        await AsyncStorage.
                            multiSet([['accessToken', accessToken], ['refreshToken', refreshToken.toString()]]);
                        navigation.dispatch(
                            CommonActions.navigate({
                                name: 'myinfo'
                            })
                        )
                        break;
                    }
            }
        }
        catch (err) {
            console.log(err)
            const statusCode = err.response.data.statusCode;
            const message = err.response.data.message;
            switch (statusCode) {
                //인증번호 불일치(로그인 실패)
                case 401:
                    setInfoMessage(message);
                    setAuthCode('');
                    break;
                case 403:
                case 404:
                    setIsSend(false);
                    setAuthCode('');
                    setIsExceed(false);
                    setBtnText('인증번호 다시 받기');
                    setInfoMessage(message);
                    break;
            }
        }
    }

    const reset = () => {
        setIsExceed(false); setBtnText('인증번호 받기'); setInfoMessage('');
        setIsSend(false); setAuthCode(''); setIsNewUser(false);
    }

    return (
        <>
            <Text style={styles.infoText}>
                휴대폰 번호 인증으로 간편하게 로그인하세요.
            </Text>
            <View style={styles.inputId}>
                <TextInput
                    value={id}
                    onChangeText={(text) => { dispatch(saveId(text)); setId(text) }}
                    keyboardType='decimal-pad'
                    placeholder='휴대폰 번호를 입력해주세요( - 제외)'
                    style={styles.inputPlaceHolderText}
                />
            </View>

            {isSend ?
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        value={authCode}
                        onChangeText={(text) => setAuthCode(text)}
                        placeholder='인증번호 6자리를 입력해주세요'
                        keyboardType='decimal-pad'
                        style={inputPlaceHolderText('auth')}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableHighlight
                            underlayColor='none'
                            onPress={() => requestAuthNumber()}>
                            <Text style={styles.reSendText}>
                                인증번호 재전송
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View> : null}

            {infoMessage ?
                <Text style={[styles.errorText, { marginTop: isSend ? 10 : 0 }]}>
                    {infoMessage}
                </Text> : null}

            {!isExceed ?
                <View style={getAuthBtn(id, isSend, authCode, infoMessage)}>
                    <TouchableHighlight
                        underlayColor='none'
                        disabled={
                            (id.length == 10 || id.length == 11 && !isSend) ||
                                (authCode.length == 6 && isSend) ? false : true}
                        onPress={() => isSend ? checkAuthCode() : requestAuthNumber()}>

                        <Text style={styles.btnText}>
                            {btnText}
                        </Text>

                    </TouchableHighlight>
                </View> : null}
        </>
    );
}

const styles = StyleSheet.create({

    infoText: {
        marginTop: 15,
        marginLeft: 22,
        color: '#4dbd91',
        fontSize: Platform.OS === 'ios' ? 13 : 16,
    },

    inputId: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    errorText: {
        marginLeft: 25,
        marginBottom: 10,
        color: 'red',
        fontSize: Platform.OS === 'ios' ? 10 : 12,
    },

    inputPlaceHolderText: {
        paddingLeft: 10,
        paddingVertical: 11,
        borderRadius: 5,
        fontSize: Platform.OS === 'ios' ? 12 : 15,
        borderWidth: 0.5,
        borderColor: 'silver',
        width: '90%',
        alignSelf: 'center',
    },

    btnText: {
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 13 : 16,
        textAlign: 'center',
        paddingVertical: 15
    },

    reSendText: {
        paddingHorizontal: 30,
        marginLeft: 10,
        paddingVertical: 15,
        color: '#78e7b9',
        textAlign: 'center',
        borderColor: 'silver',
        borderWidth: 0.5,
        borderRadius: 5
    }
});

const getAuthBtn = (id, isSend, authCode, infoMessage) => StyleSheet.create({
    marginLeft: 20,
    marginRight: 20,
    backgroundColor:
        ((id.length == 10 || id.length == 11) && !isSend) ||
            (authCode.length == 6 && isSend) ? '#78e7b9' : '#c0f3dc',
    borderRadius: 10,
    marginTop: isSend && !infoMessage ? 15 : 0
})

const inputPlaceHolderText = (type) => StyleSheet.create({
    paddingLeft: 10,
    paddingVertical: 11,
    borderRadius: 5,
    fontSize: type === 'auth' ?
        (Platform.OS === 'ios' ? 10 : 13) :
        (Platform.OS === 'ios' ? 10 : 14)
    ,
    borderWidth: 0.5,
    borderColor: 'silver',
    width: type === 'auth' ? wp('50%') : wp('90%'),
    alignSelf: type === 'auth' ? 'flex-start' : 'center',
    marginLeft: type === 'auth' ? 20 : 0
});