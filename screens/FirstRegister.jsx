/* 회원가입 페이지 첫페이지*/
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Platform,
    TouchableHighlight
} from "react-native";
import { CheckBox } from "@rneui/themed";
import axios from "axios";
import { useDispatch } from "react-redux";
import StatusBarComponent from '../components/StatusBarComponent';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { saveFirstRegister } from "../redux/registerSlice";

export default function Join( { navigation }) {
    const dispatch = useDispatch();

    const [id, setId] = useState(''); //아이디
    const [name, setName] = useState(''); //이름
    const [birth, setBirth] = useState(''); //생년월일
    const [btnText, setBtnText] = useState('인증번호 받기');
    const [infoMessage, setInfoMessage] = useState('');
    const [isSend, setIsSend] = useState(false); //인증번호를 보냈는지
    const [isAuthed, setIsAuthed] = useState(false); //인증 성공여부
    const [authCode, setAuthCode] = useState(''); //인증번호

    const [whoSelected, setWhoSelected] = useState(''); //가입목적
    const [whichSelected, setWhichSelected] = useState(''); //성별
    const [isFill, setIsFill] = useState(false); //모든항목이 입력되었는지
    const [selectSex, setSelectSex] = useState([{
        id: 1,
        title: '남',
        checked: false
    }, {
        id: 2,
        title: '여',
        checked: false
    }
    ])
    const [selectPurpose, setSelectPurpose] = useState(
        [{
            id: 1,
            title: '간병인',
            checked: false
        }, {
            id: 2,
            title: '활동보조사',
            checked: false
        }, {
            id: 3,
            title: '보호자',
            checked: false
        }])

    const selectBox = (title) => {
        //목적 체크박스 (체크항목 이외에 값 선택 안하기)
        if (title.length != 1) {
            const toggleData = [...selectPurpose];
            toggleData.map((data) => {
                if (data.title == title) {
                    data.checked = true;
                    setWhoSelected(data.title);
                }
                else
                    data.checked = false;
            });
            setSelectPurpose(toggleData);
        }
        //성별 체크박스 (체크항목 이외에 값 선택 안하기)
        else {
            const toggleData = [...selectSex];
            toggleData.map((data) => {
                if (data.title == title) {
                    data.checked = true;
                    setWhichSelected(data.title);
                }
                else
                    data.checked = false;
            });
            setSelectSex(toggleData);
        }
    }

    useEffect(() => {
        isAuthed && name && birth && whoSelected &&
            whichSelected ? setIsFill(true) : setIsFill(false)
    }, [isAuthed, name, birth, whoSelected, whichSelected])

    //인증번호 얻기
    const requestAuthNumber = () => {
        setBtnText('인증하기') //인증번호 받기 버튼 => 인증하기
        setIsSend(true); //인증이 보내짐
        axios({
            method: 'GET',
            url: `http://172.30.1.30:8080/auth/register/${id}`,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            setInfoMessage(res.data)
        }).catch((error) => {
            setInfoMessage('네트워크 오류로 전송에 실패했습니다.')
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

        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <KeyboardAwareScrollView
                extraHeight={150}
                extraScrollHeight={30}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.eachInput}>
                    {!isAuthed ?
                        <>
                            <Text style={styles.eachInputText}>
                                휴대폰 번호
                            </Text>

                            <TextInput
                                onChangeText={(text) => setId(text)}
                                value={id}
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

                <View style={styles.eachInput}>
                    <Text style={styles.eachInputText}>
                        이름
                    </Text>

                    <TextInput
                        onChangeText={(text) => setName(text)}
                        value={name}
                        placeholder='이름을 입력해주세요'
                        style={inputPlaceHolderText('normal')}
                    />
                </View>

                <View style={styles.eachInput}>
                    <Text style={styles.eachInputText}>
                        생년월일
                    </Text>

                    <TextInput
                        onChangeText={(text) => setBirth(text)}
                        value={birth}
                        keyboardType='decimal-pad'
                        placeholder='생년월일을 입력해주세요(Ex: 19980202)'
                        style={inputPlaceHolderText('normal')}
                    />
                </View>

                <View style={styles.eachInput}>
                    <Text style={styles.eachInputText}>
                        성별
                    </Text>
                    <View style={select('sex')}>
                        {selectSex.map((select) => {
                            return (
                                <CheckBox
                                    key={select.id}
                                    title={select.title}
                                    textStyle={{ marginLeft: 2 }}
                                    checked={select.checked}
                                    checkedColor='#a0b493'
                                    onPress={() => selectBox(select.title)}
                                />
                            )
                        })}
                    </View>
                </View>

                <View style={styles.eachInput}>
                    <Text style={styles.eachInputText}>
                        가입목적
                    </Text>
                    <View style={select('purpose')}>
                        {selectPurpose.map((select) => {
                            return (
                                <CheckBox
                                    key={select.id}
                                    title={select.title}
                                    textStyle={{ marginLeft: 2 }}
                                    checked={select.checked}
                                    checkedColor='#a0b493'
                                    onPress={() => selectBox(select.title)}
                                />
                            )
                        })}
                    </View>
                </View>
                <View style={fill(isFill)}>
                    <TouchableHighlight
                        underlayColor='none'
                        style={{ width: '100%' }}
                        disabled={isFill ? false : true}
                        onPress={() => navigation.push('registerSecond')}
                    >
                        <Text style={styles.btnText}>
                            다음
                        </Text>
                    </TouchableHighlight>
                </View>
            </KeyboardAwareScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

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

const select = (type) => StyleSheet.create({
    flexDirection: 'row',
    justifyContent: type === 'sex' ? 'flex-start' : 'space-around',
    alignItems: 'flex-start',
    marginLeft: type === 'sex' ? 5 : -5,
    marginTop: -10,
})

const fill = (isFill) => StyleSheet.create({
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: isFill ? '#78e7b9' : '#c0f3dc'
})

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