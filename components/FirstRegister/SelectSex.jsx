/* 첫번째 회원가입 성별 선택 */
import React, { useState } from "react";
import { useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableHighlight,
} from "react-native";
import { useDispatch } from "react-redux";
import resetArrayData from "../../functions/resetArrayData";
import { saveSex} from "../../redux/action/register/firstRegisterAction";
import sexData from "../../data/Register/sex.data";

export default function SelectSex() {
    const dispatch = useDispatch();
    const [selectSex, setSelectSex] = useState(sexData);

    useEffect(() => {
        setSelectSex(resetArrayData(selectSex));
    }, []);

    const selectBox = (title) => {
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

    return (
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
                                width: '40%',
                                borderWidth: 0.5,
                                backgroundColor: select.checked ? '#a5d847' : 'white',
                                borderColor: select.checked ? 'whitesmoke' : '#cacaca',
                                marginTop: 10,
                            }}
                            key={select.id}
                            underlayColor='none'
                            onPress={() => { selectBox(select.title) }}
                        >
                            <Text style={{
                                color: select.checked ? 'white' : '#81c300',
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