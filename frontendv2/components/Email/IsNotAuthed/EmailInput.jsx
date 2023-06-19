/* 이메일 등록하기 이메일 인증 부분 */
import { StackActions } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { Platform } from "react-native";
import { TouchableHighlight } from "react-native";
import { TextInput } from "react-native";
import { View } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import api from "../../../config/CustomAxios";
import { requestRefreshToken } from "../../../functions/Token";
import { reset, saveAuthCode, saveBtnText, saveInfoMessage, saveIsExceed, saveIsSend } from "../../../redux/action/login/loginAction";
import { logout, saveEmail } from "../../../redux/action/user/userAction";

export default function EmailInput({ navigation }) {
    const dispatch = useDispatch();
    const emailReg = /^[0-9a-zA-Z]([-_#$!.]?[0-9a-zA-Z])*@[a-zA-Z]*\.[a-zA-Z]{2,3}$/i;
    const [emailPass, setEmailPass] = useState(false);
    const [email, setEmail] = useState('');

    const { id, isSend, isExceed, btnText, infoMessage, authCode, isAuthed } = useSelector(state => ({
        id: state.user.id,
        isSend: state.login.isSend,
        isExceed: state.login.isExceed,
        btnText: state.login.btnText,
        infoMessage: state.login.infoMessage,
        authCode: state.login.authCode,
        isAuthed: state.login.isAuthed
    }),
        shallowEqual
    );

    useEffect(() => {
        if (emailReg.test(email)) {
            dispatch(saveInfoMessage(''))
            setEmailPass(true);
        }
        else {
            if (email === null || email.length == 0) {
                dispatch(saveInfoMessage(''));
                setEmailPass(false);
            }
            else {
                dispatch(saveInfoMessage('이메일형식을 확인해주세요'))
                setEmailPass(false)
            }
        }
    }, [email]);

    const checkEmailCode = async () => {
        try {
            const res = await api.post('/auth/email', {
                id: id,
                email: email,
                userInputCode: authCode,
                path: 'register',
            });
            const status = res.data.status;
            console.log(res.data)
            switch (status) {
                case 'success':
                    dispatch(saveEmail(email));
                    dispatch(saveAuthCode(''));
                    navigation.dispatch(
                        StackActions.pop()
                    )
                    dispatch(reset());
                    break;
            }
        }
        catch (err) {
            console.log('here:', err)
            const statusCode = err.response.data.statusCode;
            const message = err.response.data.message;
            switch (statusCode) {
                //인증번호 불일치(로그인 실패)
                case 401:
                    dispatch(saveInfoMessage(message))
                    dispatch(saveAuthCode(''));
                    break;
                case 403:
                case 404:
                    dispatch(saveIsSend(false));
                    dispatch(saveAuthCode(''));
                    dispatch(saveIsExceed(false));
                    dispatch(saveBtnText('인증번호 다시 받기'));
                    dispatch(saveInfoMessage(message))
                    break;
            }
        }
    }

    const requestEmail = async () => {
        dispatch(saveAuthCode(''));
        try {
            const res = await api.get(`/auth/email/${email}`);
            const status = res.data['status'];
            const message = res.data['message'];
            switch (status) {
                //기존 회원일 경우
                case 'duplicate':
                    dispatch(saveInfoMessage(message));
                    break;
                case 'newemail':
                    dispatch(saveInfoMessage(message));
                    dispatch(saveBtnText('인증하기'));
                    dispatch(saveIsSend(true));
                    break;
            }
        }
        catch (err) {
            const statusCode = err.response.data.statusCode;
            const message = err.response.data.message;
            //console.log(statusCode, message)
            switch (statusCode) {
                //네이버와 통신 불가
                case 500:
                    dispatch(saveInfoMessage(message));
                    break;
                //하루 인증횟수 초과
                case 403:
                    dispatch(saveInfoMessage(message));
                    dispatch(saveIsSend(false));
                    dispatch(saveIsExceed(true));
                    break;
                //토큰 만료된 경우
                case 401:
                    if (await requestRefreshToken(navigation))
                        requestEmail();
                    break;
                //토큰이 없거나 잘못된 경우
                case 400:
                case 404:
                    dispatch(logout());
                    navigation.dispatch(
                        StackActions.push('loginPage')
                    )
            }
        }
    }

    return (
        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingHorizontal: 22 }}>
            <TextInput
                style={styles.emailTextInput}
                keyboardType='email-address'
                onChangeText={(text) => setEmail(text)}
                placeholder="이메일을 입력해주세요"
            />

            {isSend && !isAuthed ?
                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'flex-start', width: '100%' }}>
                    <TextInput
                        value={authCode}
                        onChangeText={(text) => dispatch(saveAuthCode(text))}
                        placeholder='인증번호 6자리를 입력해주세요'
                        keyboardType='decimal-pad'
                        style={inputPlaceHolderText}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '40%' }}>
                        <TouchableHighlight
                            underlayColor='none'
                            onPress={() => requestEmail()}>
                            <Text style={styles.reSendText}>
                                인증메일 재전송
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View> : null}

            {(infoMessage) ?
                <Text style={styles.errorMessage}>
                    {infoMessage}
                </Text> :
                null}

            {!isExceed ?
                <TouchableHighlight
                    underlayColor='none'
                    disabled={
                        (emailPass && !isSend) || (authCode.length == 6 && isSend) ? false : true
                    }
                    onPress={() => isSend ? checkEmailCode() : requestEmail()}
                >
                    <Text style={btnTextStyle (emailPass, isSend, authCode)}>
                        {btnText}
                    </Text>
                </TouchableHighlight>
                : null}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: 'white',
    },
    emailTextInput: {
        marginTop: 15,
        paddingLeft: 10,
        paddingVertical: 11,
        borderRadius: 5,
        fontSize: Platform.OS === 'ios' ? 12 : 14,
        borderWidth: 0.5,
        borderColor: 'silver',
        width: '100%',
        alignSelf: 'center',
    },
    errorMessage: {
        color: 'red',
        marginTop: 15,
        marginLeft: 5,
        fontSize: 12,
    },
    reSendText: {
        paddingHorizontal: 20,
        marginLeft: 10,
        paddingVertical: 15,
        color: 'rgba(65, 92, 118, 0.85)',
        textAlign: 'center',
        borderColor: 'silver',
        borderWidth: 0.5,
        borderRadius: 5
    }
});

const btnTextStyle = (emailPass, isSend, authCode) => StyleSheet.create({
    textAlign: 'center',
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 5,
    borderColor: 'whitesmoke',
    fontSize: Platform.OS === 'ios' ? 12 : 15,
    backgroundColor: (emailPass && !isSend) || (authCode.length == 6 && isSend) ? 'rgba(65, 92, 118, 0.85)' : 'rgba(65, 92, 118, 0.25)',
    color: 'white'
})

const inputPlaceHolderText = StyleSheet.create({
    paddingLeft: 10,
    paddingVertical: 11,
    borderRadius: 5,
    width: '60%',
    fontSize: Platform.OS === 'ios' ? 12 : 14,
    borderWidth: 0.5,
    borderColor: 'silver',
    alignSelf: 'center',
})

