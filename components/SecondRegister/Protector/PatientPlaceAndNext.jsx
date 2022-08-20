/* 보호자용 2번째 회원가입 환자 케어 장소 및 다음 병원 이동 여부 */

import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import ResetArrayData from "../../../functions/ResetArrayData";
import { saveIsNext, savePlace } from "../../../redux/action/register/secondRegisterAction";
import isNextData from "../../../data/Register/SecondRegister/isNext.data";
import inputStyle from "../../../styles/Register/inputStyle";

export default function PatientPlaceAndNext() {
    const [isNextHospital, setIsNextHospital] = useState(isNextData);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsNextHospital(ResetArrayData(isNextHospital));
    }, []);

    const selectBox = (title) => {
        const toggleData = [...isNextHospital];
        toggleData.map((data) => {
            if (data.title === title) {
                data.checked = true;
            }
            else
                data.checked = false;
        });
        dispatch(saveIsNext(title));
        setIsNextHospital(toggleData);
    }

    return (
        <View style={styles.patientPlaceAndNext}>
            <View style={styles.columnStyle}>
                <Text>
                    간병하게 될 장소
                </Text>
                <TextInput
                    onChangeText={(text) => dispatch(savePlace(text))}
                    maxLength = {12}
                    placeholder="Ex)서울대병원, OO요양병원"
                    style={[inputStyle('startDate'), { width: '90%' }]}
                />
            </View>
            <View style={styles.columnStyle}>
                <Text>
                    다음 병원 이동 여부
                </Text>
                <View style={styles.select}>
                    {isNextHospital.map((select) => {
                        return (
                            <TouchableHighlight
                                onPress={() => selectBox(select.title)}
                                underlayColor='none'
                                key={select.id}
                                style={{
                                    width: '45%',
                                    borderWidth: 0.5,
                                    borderRadius: 5,
                                    backgroundColor: select.checked ? '#a5d847' : 'white',
                                    borderColor: select.checked ? 'whitesmoke' : '#cacaca',
                                }}>
                                <Text style={{
                                    textAlign: 'center',
                                    paddingVertical: 5,
                                    color: select.checked ? 'whitesmoke' : '#81c300',
                                }}>
                                    {select.title}
                                </Text>
                            </TouchableHighlight>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    columnStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 1
    },

    patientPlaceAndNext: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        height: hp('12%'),
        paddingLeft: 20,
    },

    select: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 12
    }
})