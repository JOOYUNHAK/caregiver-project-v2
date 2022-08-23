/* 회원가입 생년월일 입력 */
import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { saveName, saveBirth } from "../../redux/action/register/firstRegisterAction";

export default function InputBirth() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    return (
        <>
            <View style={styles().eachInput}>
                <Text style={styles().eachInputText}>
                    이름
                </Text>

                <TextInput
                    onChangeText={(text) => {dispatch(saveName(text)); setName(text)}}
                    maxLength = {4}
                    placeholder='이름을 입력해주세요'
                    style={styles('normal').inputPlaceHolderText}
                />
            </View>

            <View style={styles().eachInput}>
                <Text style={styles().eachInputText}>
                    생년월일
                </Text>

                <TextInput
                    maxLength={8}
                    onChangeText={(text) => {dispatch(saveBirth(text)); setBirth(text)}}
                    keyboardType='decimal-pad'
                    placeholder='생년월일을 입력해주세요(Ex: 19980202)'
                    style={styles('normal').inputPlaceHolderText}
                />
            </View>
        </>
    )
}

const styles = (type) => StyleSheet.create({
    eachInputText: {
        paddingLeft: 20,
        fontSize: Platform.OS === 'ios' ? 10 : 13,
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
        paddingVertical: 11,
        borderRadius: 5,
        marginTop: type === 'auth' ? 10 : 0,
        fontSize: type === 'auth' ?
            (Platform.OS === 'ios' ? 10 : 13) :
            (Platform.OS === 'ios' ? 10 : 14),
        borderWidth: 0.5,
        borderColor: 'silver',
        width: type === 'auth' ? '50%' : '90%',
        alignSelf: type === 'auth' ? 'flex-start' : 'center',
        marginLeft: type === 'auth' ? 20 : 0
    }
});


