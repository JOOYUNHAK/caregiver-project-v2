/* 첫번째 회원가입 가입 목적 선택 */
import React, { useState } from "react";
import { useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
} from "react-native";
import { useDispatch } from "react-redux";
import ResetArrayData from "../../functions/ResetArrayData";
import { savePurpose } from "../../redux/action/register/firstRegisterAction";
import purposeData from "../../data/Register/FirstRegister/purpose.data";

export default function SelectPurpose() {
    const dispatch = useDispatch();
    const [selectPurpose, setSelectPurpose] = useState(purposeData);
    useEffect(() => {
        setSelectPurpose(ResetArrayData(selectPurpose));
    }, []);

    const selectBox = (title) => {
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
    return (
        <View style={styles().eachInput}>
            <Text style={styles().eachInputText}>
                가입목적
            </Text>
            <View style={styles('purpose').select}>
                {selectPurpose.map((select) => {
                    return (
                        <TouchableHighlight
                            style={{
                                borderRadius: 5,
                                width: '25%',
                                backgroundColor:
                                    select.checked ? '#a5d847' : 'white',
                                borderWidth: 0.5,
                                borderColor: select.checked ? 'whitesmoke' : '#cacaca',
                                marginTop: 10,
                            }}
                            key={select.id}
                            underlayColor='none'
                            onPress={() => { selectBox(select.title) }}
                        >
                            <Text style={{
                                color: select.checked ? 'whitesmoke' : '#81c300',
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

    select: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginTop: -10,
    }
});