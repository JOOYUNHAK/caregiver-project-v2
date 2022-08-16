/* 회원가입 성별, 가입목적 고르는 부분 */

import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableHighlight,
} from "react-native";
import { useDispatch } from "react-redux";
import { saveSex, savePurpose } from "../../redux/action/register/firstRegisterAction";

export default function SelectSexPurpose() {
    const dispatch = useDispatch();
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
                if (data.title === title) {
                    data.checked = true;
                }
                else
                    data.checked = false;
            });
            dispatch(savePurpose(title));
            setSelectPurpose(toggleData);
        }
        //성별 체크박스 (체크항목 이외에 값 선택 안하기)
        else {
            const toggleData = [...selectSex];
            toggleData.map((data) => {
                if (data.title == title) {
                    data.checked = true;
                }
                else
                    data.checked = false;
            });
            dispatch(saveSex(title));
            setSelectSex(toggleData);
        }
    }
    return (
        <>
            <View style={styles().eachInput}>
                <Text style={styles().eachInputText}>
                    성별
                </Text>
                <View style={styles('sex').select}>
                    {selectSex.map((select) => {
                        return (
                            <TouchableHighlight
                                style={{
                                    borderRadius: 8,
                                    width: '42%',
                                    backgroundColor: 
                                        select.checked ? '#78e7b9' : 'whitesmoke',
                                    marginTop: 10,
                                }}
                                key={select.id}
                                underlayColor='none'
                                onPress={() => {selectBox(select.title)}}
                            >
                                <Text style={{
                                    color: select.checked ? 'white' : 'silver',
                                    textAlign: 'center',
                                    paddingVertical: 13
                                }}>
                                    {select.title}
                                </Text>
                            </TouchableHighlight>
                        )
                    })}
                </View>
            </View>

            <View style={styles().eachInput}>
                <Text style={styles().eachInputText}>
                    가입목적
                </Text>
                <View style={styles('purpose').select}>
                    {selectPurpose.map((select) => {
                        return (
                            <TouchableHighlight
                                style={{
                                    borderRadius: 8,
                                    width: '25%',
                                    backgroundColor: 
                                        select.checked ? '#78e7b9' : 'whitesmoke',
                                    marginTop: 10,
                                }}
                                key={select.id}
                                underlayColor='none'
                                onPress={() => {selectBox(select.title)}}
                            >
                                <Text style={{
                                    color: select.checked ? 'white' : 'silver',
                                    textAlign: 'center',
                                    paddingVertical: 13
                                }}>
                                    {select.title}
                                </Text>
                            </TouchableHighlight>
                        )
                    })}
                </View>
            </View>
        </>
    )
}

const styles = (type) => StyleSheet.create({

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

    select: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginTop: -10,
    }
});
