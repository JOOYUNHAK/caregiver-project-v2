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
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveId, saveIsAuthed } from "../../redux/action/register/firstRegisterAction";

export default function AuthId() {

    const [id, setId] = useState('');
    const [btnText, setBtnText] = useState('인증번호 받기');
    const [infoMessage, setInfoMessage] = useState('');
    const [isAuthed, setIsAuthed] = useState(false); //인증 여부
    const [isSend, setIsSend] = useState(false); //인증번호를 보냈는지
    const [authCode, setAuthCode] = useState(''); //인증번호
    const dispatch = useDispatch();
    //인증번호 얻기
    const requestAuthNumber = () => {
        axios({
            method: 'GET',
            url: `http://172.30.1.30:8080/auth/register/${id}`,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            setInfoMessage(res.data)
            setBtnText('인증하기') //인증번호 받기 버튼 => 인증하기
            setIsSend(true); //인증이 보내짐
        }).catch((error) => {
            setInfoMessage('네트워크 오류로 전송에 실패했습니다.');
        })
    }

    //인증번호검사
    const checkAuthCode = () => {
        axios({
            method: 'POST',
            url: 'http://172.30.1.30:8080/auth/check',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "id": id,
                "userInputCode": authCode
            }
        })
            .then((res) => {
                switch (res.data) {
                    case true:
                        setBtnText('인증에 성공하였습니다.');
                        setInfoMessage('');
                        setIsAuthed(true);
                        dispatch(saveIsAuthed(true));
                        break;
                    case false:
                        setInfoMessage('인증번호가 일치하지 않습니다.');
                        break;
                    default:
                        setInfoMessage(res.data)
                }
            })
            .catch((error) => {
                console.log(error.response);
            })
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
                    <TextInput
                        onChangeText={(text) => setAuthCode(text)}
                        value={authCode}
                        placeholder='인증번호 6자리를 입력해주세요'
                        keyboardType='decimal-pad'
                        style={inputPlaceHolderText('auth')}
                    />
                    : null}
                {infoMessage ? <Text style={styles.infoText}>{infoMessage}</Text> : null}
            </View>
            <View style={getAuthBtn(id, isSend, authCode, isAuthed)}>
                <TouchableHighlight
                    disabled={ //인증번호를 보내기전, 인증번호를 보내고, 인증이 완료되었을 때 버튼 비활성
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
            </View>
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
        width: '100%',
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
        marginLeft: 20,
        marginTop: 10,
        fontWeight: 'bold',
        color: 'red',
        fontSize: Platform.OS === 'ios' ? 10 : 12
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
    width: type === 'auth' ? '50%' : '90%',
    alignSelf: type === 'auth' ? 'flex-start' : 'center',
    marginLeft: type === 'auth' ? 20 : 0
});

const getAuthBtn = (id, isSend, authCode, isAuthed) => StyleSheet.create({
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 20,
    //전화번호가 입력되고 인증버튼 눌렸을 경우와 인증코드가 6자리가 되었을경우
    backgroundColor:
        ((id.length == 11 || id.length == 10) && !isSend) ||
            (authCode.length == 6 && isSend && !isAuthed) ? '#78e7b9' : '#c0f3dc',
    marginTop: 15
})