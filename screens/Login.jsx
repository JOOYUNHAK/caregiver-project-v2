/* 로그인 페이지 */
import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Text,
    Platform
}
    from 'react-native';
import StatusBarComponent from '../components/StatusBarComponent';



export default function Login({ navigation }) {

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
                    style={styles.inputPlaceHolderText}
                />
            </View>

            <View style={getAuthBtn(id)}>
                <TouchableHighlight
                    underlayColor='none'
                    disabled = {id.length == 10 || id.length == 11 ? false : true}
                    onPress={() => requestAuthNumber()}
                    
                >
                    <Text style={styles.getAuthBtnText}>
                        {btnText}
                    </Text>
                </TouchableHighlight>
            </View>

            <View style={styles.userAboutAccount}>
                <View style={styles.eachAbout}>
                    <Text>
                        믿음으로 이용이 처음이신가요?
                    </Text>
                    <TouchableHighlight
                        underlayColor='none'
                        style={styles.eachAboutTouch}
                        onPress={() => navigation.push('firstRegisterPage')}
                    >
                        <Text style={styles.eachAboutText}>
                            가입하기
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.eachAbout}>
                    <Text>
                        휴대폰 번호가 변경되었나요?
                    </Text>
                    <TouchableHighlight
                        underlayColor='none'
                        style={styles.eachAboutTouch}
                    >
                        <Text style={styles.eachAboutText}>
                            재설정 하기
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.eachAbout}>
                    <Text>
                        비밀번호를 잊어버리셨나요?
                    </Text>
                    <TouchableHighlight
                        underlayColor='none'
                        style={styles.eachAboutTouch}
                    >
                        <Text style={styles.eachAboutText}>
                            찾으러 가기
                        </Text>
                    </TouchableHighlight>
                </View>
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
        color: '#4dbd91',
        fontSize: Platform.OS === 'ios' ? 13 : 16,
        fontWeight: 'bold'
    },

    inputId: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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

    getAuthBtnText: {
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 13 : 16,
        textAlign: 'center',
        paddingBottom: 15,
        paddingTop: 15
    },

    userAboutAccount: {
        marginTop: 30,
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    eachAbout: {
        flexDirection: 'row',
        paddingBottom: 15
    },

    eachAboutTouch: {
        marginLeft: 5,
    },

    eachAboutText: {
        color: '#4dbd91',
        fontWeight: '500'
    }
});

const getAuthBtn = (id) => StyleSheet.create({
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: id.length == 10 || id.length == 11 ? '#78e7b9' : '#c0f3dc',
    borderRadius: 10
})