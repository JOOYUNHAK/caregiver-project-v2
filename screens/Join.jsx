/* 회원가입 페이지 */
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, TextInput, Platform } from "react-native";
import StatusBarComponent from '../components/StatusBarComponent';

export default function Join () {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [authCode, setAuthCode] = useState('');


    return(
       <SafeAreaView >
        <StatusBarComponent />
        <View style ={styles.container}>
            <View style = {styles.eachInput}>
                <Text style = {styles.eachInputText}>
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

            <View style = {styles.eachInput}>
                <Text style = {styles.eachInputText}>
                    이름
                </Text>

                <TextInput
                    onChangeText={(text) => setName(text)}
                    value={birth}
                    placeholder='이름을 입력해주세요'
                    style={styles.inputPlaceHolderText}
                />
            </View>

            <View style = {styles.eachInput}>
                <Text style = {styles.eachInputText}>
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

        </View>
       </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor:'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    eachInputText: {
        marginLeft: 20,
        fontSize: 14,
        marginBottom:8
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
        borderColor: '#c5d6b9',
        width: '90%',
        alignSelf: 'center',
    },
})