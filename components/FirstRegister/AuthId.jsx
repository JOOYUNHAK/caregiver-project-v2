/* 회원가입의 휴대폰 인증 부분 */
import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Platform,
    TouchableHighlight
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { saveId, saveIsAuthed } from "../../redux/action/register/firstRegisterAction";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import api from "../../config/CustomAxios";

export default function AuthId() {

    const auth = useSelector(state => state.firstRegister.isAuthed);
    const [id, setId] = useState('');
    const [isExceed, setIsExceed] = useState(false);
    const [btnText, setBtnText] = useState(
            auth ? '인증에 성공했습니다.' : '인증번호 받기');
    const [infoMessage, setInfoMessage] = useState('');
    const [isAuthed, setIsAuthed] = useState(auth); //인증 여부
    const [isSend, setIsSend] = useState(false); //인증번호를 보냈는지
    const [authCode, setAuthCode] = useState(''); //인증번호
    const dispatch = useDispatch();
    
    //인증번호 얻기
    const requestAuthNumber = async () => {
        setAuthCode('');
        try {
            const res = await api.get(`/auth/register/${id}`);
            const status = res.data['status'];
            const message = res.data['message'];
            switch (status) {
                case 'duplicate':
                    setInfoMessage(message);
                    break;
                case 'newuser':
                    setInfoMessage(message);
                    setBtnText('인증하기');
                    setIsSend(true);
                    break;
            }
        }
        catch (err) {
            const statusCode = err.response.data.statusCode;
            const message = err.response.data.message;
            switch(statusCode) {
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

    //인증번호검사
    const checkAuthCode = async () => {
        try {
            const res = await api.post('/auth/sms', {
                id: id,
                userInputCode: authCode,
                path: 'register'
            });
            const status = res.data.status;
            
            switch (status) {
                case 'success':
                    setBtnText('인증에 성공하였습니다.');
                    setInfoMessage('');
                    setIsAuthed(true);
                    dispatch(saveIsAuthed(true));
                    break;
            }
        }
        catch (err) {
            const statusCode = err.response.data.statusCode;
            const message = err.response.data.message;
            switch(statusCode) {
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
    return (
        <>
            <View style={styles.eachInput}>
                {!isAuthed ?
                    <>
                        <Text style={styles.eachInputText}>
                            휴대폰 번호
                        </Text>
                        <TextInput
                            onChangeText={(text) => { dispatch(saveId(text)); setId(text) }}
                            keyboardType='decimal-pad'
                            placeholder='휴대폰 번호를 입력해주세요( - 제외)'
                            style={inputPlaceHolderText('normal')}
                        />
                    </> : null}
                {(isSend && !isAuthed) ? //인증번호를 요청했거나, 요청했는데 번호가 맞지않을 경우
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            onChangeText={(text) => setAuthCode(text)}
                            value={authCode}
                            placeholder='인증번호 6자리를 입력해주세요'
                            keyboardType='decimal-pad'
                            style={inputPlaceHolderText('auth')}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableHighlight
                                underlayColor='none'
                                onPress={() => requestAuthNumber()}
                            >
                                <Text style={styles.reSendText}>
                                    인증번호 재전송
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    : null}
                {infoMessage ? <Text style={styles.infoText}>{infoMessage}</Text> : null}
            </View>

            {!isExceed ?
            <View style={getAuthBtn(id, isSend, authCode, isAuthed)}>
                <TouchableHighlight
                    disabled={ //인증번호를 보내기전, 인증번호를 보낸 후, 인증이 완료되었을 때 버튼 비활성
                        (id.length == 10 || id.length == 11 && !isSend) ||
                            (authCode.length == 6 && isSend && !isAuthed) ? false : true}
                    underlayColor='none'
                    onPress={() => {
                        (isSend && !isAuthed) ? checkAuthCode() : requestAuthNumber()
                    }}
                >
                    <Text style={styles.btnText}>
                        {btnText}
                    </Text>
                </TouchableHighlight>
            </View> : null }
        </>
    )
}

const styles = StyleSheet.create({

    eachInputText: {
        marginLeft: 20,
        fontSize: Platform.OS === 'ios' ? 10 : 13,
        marginBottom: 8
    },

    eachInput: {
        width: wp('100%'),
        marginTop: 30,
        flexDirection: 'column',
        justifyContent: 'center'
    },

    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 13 : 16,
        paddingTop: 15,
        paddingBottom: 15
    },

    infoText: {
        marginLeft: 25,
        marginTop: 10,
        color: 'red',
        fontSize: Platform.OS === 'ios' ? 10 : 12
    },

    reSendText: {
        paddingHorizontal: 30,
        marginTop: 10,
        marginLeft: 10,
        paddingVertical: 15,
        color: '#78e7b9',
        textAlign: 'center',
        borderColor: 'silver',
        borderWidth: 0.5,
        borderRadius: 5
    }
});

const inputPlaceHolderText = (type) => StyleSheet.create({
    paddingLeft: 10,
    paddingVertical: 11,
    borderRadius: 5,
    marginTop: type === 'auth' ? 10 : 0,
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

const getAuthBtn = (id, isSend, authCode, isAuthed) => StyleSheet.create({
    borderRadius: 10,
    width: wp('90%'),
    alignSelf: 'center',
    //전화번호가 입력되고 인증버튼 눌렸을 경우와 인증코드가 6자리가 되었을경우
    backgroundColor:
        ((id.length == 11 || id.length == 10) && !isSend) ||
            (authCode.length == 6 && isSend && !isAuthed) ? '#78e7b9' : '#c0f3dc',
    marginTop: 15
})