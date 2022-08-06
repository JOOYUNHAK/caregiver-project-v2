/* 로그인 페이지 */
import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Text,
}
    from 'react-native';
import StatusBarComponent from '../components/StatusBarComponent';



export default function Login() {
  
    const [id, setId] = useState('');
    const [authCode, setAuthCode] = useState();

    const [btnText, setBtnText] = useState('인증번호 받기');
    const [isBtnClicked, setIsBtnClicked] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [isIdPass, setIsIdPass] = useState(false);
    //인증번호 요청
    const requestAuthNumber = async () => {
        setIsBtnClicked(true); //인증 받기 버튼을 눌렀을 때
        setBtnText('인증확인하고 로그인') //버튼 텍스트 바
    };

    return (

        <SafeAreaView style={styles.container} >
            <StatusBarComponent />
            <Text style={styles.infoText}>
                휴대폰 번호 인증으로 간편하게 로그인하세요.
            </Text>
            <View style={styles.inputId}>
                <TextInput
                    onChangeText={(text) => setId(text)}
                    value={id}
                    keyboardType='decimal-pad'
                    placeholder='휴대폰 번호를 입력해주세요( - 제외)'
                    style={styles.inputIdText}
                />
            </View>

            <TouchableHighlight
                underlayColor='none'
                onPress={() => requestAuthNumber()}
                style={styles.getAuthNumberTouch}
            >
                <View style={getAuthBtn(id)}>
                    <Text style={styles.getAuthBtnText}>
                        {btnText}
                    </Text>
                </View>
            </TouchableHighlight>

            <View style={{ flex: 7 }}>


            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
    },
    infoText: {
        marginTop: 10,
        marginLeft: 22,
        color: '#94c6ad',
        fontSize: 16,
        fontWeight: 'bold'
    },

    inputId: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputIdText: {
        paddingLeft: 10,
        paddingVertical: 9,
        borderRadius: 5,
        color: 'green',
        fontSize: 15,
        borderWidth: 2,
        borderColor: '#c5d6b9',
        width: '90%',
        alignSelf: 'center',
    },

    getAuthNumberTouch: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    getAuthBtnText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        paddingBottom: 12,
        paddingTop: 12
    }
});

const getAuthBtn = (id) => StyleSheet.create({
    width: '90%',
    backgroundColor: id.length == 10 || id.length == 11 ? '#c5d6b9' : '#e7efe3',
    borderRadius: 5
})