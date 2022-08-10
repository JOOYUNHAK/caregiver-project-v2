/* 회원가입 페이지 첫페이지*/
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, TextInput, Platform, TouchableHighlight } from "react-native";
import { CheckBox } from "@rneui/themed";
import axios from "axios";
import StatusBarComponent from '../components/StatusBarComponent';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Join() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [btnText, setBtnText] = useState('인증번호 받기')
    const [authCode, setAuthCode] = useState('');

    const [whoSelected, setWhoSelected] = useState('');
    const [whichSelected, setWhichSelected] = useState('');
    const [isFill, setIsFill] = useState(false);
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
        //목적 체크박스
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
        //성별 체크박스
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
        id && name && birth && whoSelected && whichSelected ? setIsFill(true) : setIsFill(false)
    })

    const requestAuthNumber = () => {
        setBtnText('인증하기')
        axios({
            method: 'GET',
            url: `http://172.30.1.30:8080/auth/register/${id}`,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
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
                    <Text style={styles.eachInputText}>
                        휴대폰 번호
                    </Text>

                    <TextInput
                        onChangeText={(text) => setId(text)}
                        value={id}
                        keyboardType='decimal-pad'
                        placeholder='휴대폰 번호를 입력해주세요( - 제외)'
                        style={styles.inputPlaceHolderText}
                    />
                </View>
                    <View style = {getAuthBtn(id)}>
                        <TouchableHighlight
                            disabled = {id.length == 10 || id.length == 11 ? false : true}
                            underlayColor='none'
                            onPress={() => requestAuthNumber()}
                        >
                        <Text style = {styles.btnText}>
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
                        style={styles.inputPlaceHolderText}
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
                        style={styles.inputPlaceHolderText}
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
                                    textStyle = {{marginLeft: 2}}
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
                                    textStyle = {{marginLeft: 2}}
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
                        onPress={() => console.log('tocu')}
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
        fontSize: 14,
        marginBottom: 8
    },

    eachInput: {
        width: '100%',
        marginTop: 30,
        flexDirection: 'column',
        justifyContent: 'center'
    },

    inputPlaceHolderText: {
        paddingLeft: 10,
        paddingVertical: 10,
        borderRadius: 5,
        color: 'green',
        fontSize: Platform.OS === 'ios' ? 12 : 15,
        borderWidth: 2,
        borderColor: '#d3e8c6',
        width: '90%',
        alignSelf: 'center',
    },

    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 13 : 16,
        paddingTop: 15,
        paddingBottom: 15
    }
})

const select = (type) => StyleSheet.create({
        flexDirection: 'row',
        justifyContent: type === 'sex' ? 'flex-start' : 'space-around',
        alignItems: 'flex-start',
        marginLeft:  type === 'sex' ? 5 : -5,
        marginTop: -10,
})

const fill = (isFill) => StyleSheet.create({
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        borderRadius:10,
        backgroundColor: isFill ? '#c5d6b9' : '#e7efe3'
})

const getAuthBtn = (id) => StyleSheet.create({
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: id.length == 11 || id.length == 10 ? '#c5d6b9' : '#e7efe3',
    marginTop: 15
})