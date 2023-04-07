/* 보호자용 2번째 회원가입 환자 성별 입력 */

import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import resetArrayData from "../../../functions/resetArrayData";
import { savePatientSex } from "../../../redux/action/register/secondRegisterAction";
import sexData from "../../../data/Register/sex.data";

export default function PatientSex() {
    const [patientSex, setPatientSex] = useState(sexData);
    const dispatch = useDispatch();

    useEffect(() => {
        setPatientSex(resetArrayData(patientSex));
    }, [])

    const selectBox = (title) => {
        //목적 체크박스 (체크항목 이외에 값 선택 안하기)
        const toggleData = [...patientSex];
        toggleData.map((data) => {
            if (data.title === title) {
                data.checked = true;
            }
            else
                data.checked = false;
        });
        dispatch(savePatientSex(title));
        setPatientSex(toggleData);
    };

    return (
        <View style={styles.patientSex}>
            <Text>
                환자분의 성별
            </Text>
            <View style={styles.select}>
                {patientSex.map((select) => {
                    return (
                        <TouchableHighlight
                            style={{
                                borderRadius: 8,
                                width: '40%',
                                borderWidth: select.checked ? 1 : 0.5,
                                backgroundColor: 'white',
                                borderColor: select.checked ? '#0c2461' : 'silver',
                                marginTop: 10,
                            }}
                            key={select.id}
                            underlayColor='none'
                            onPress={() => { selectBox(select.title) }}
                        >
                            <Text style={{
                                color: select.checked ? '#0c2461' : 'darkgray',
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
    );
}

const styles = StyleSheet.create({
    patientSex: {
        height: hp('12%'),
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 20,
    },

    select: {
        width: ('100%'),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: -20,
    },
})