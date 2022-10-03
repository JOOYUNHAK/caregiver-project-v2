/* 보호자용 2번째 회원가입 환자 케어 장소 및 다음 병원 이동 여부 */

import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import resetArrayData from "../../../functions/resetArrayData";
import { saveIsNext, savePlace } from "../../../redux/action/register/secondRegisterAction";
import isNextData from "../../../data/Register/SecondRegister/isNext.data";
import inputStyle from "../../../styles/Register/inputStyle";
import { useNavigation, StackActions, useRoute } from "@react-navigation/native";
import Icon from "../../Icon";

export default function PatientPlaceAndNext() {
    const [isNextHospital, setIsNextHospital] = useState(isNextData);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    let address;

   if (route?.params) {
        address = route.params.address;
    }

    useEffect(() => {
        dispatch(savePlace(address));
    }, [route])

    useEffect(() => {
        setIsNextHospital(resetArrayData(isNextHospital));
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

                {address ?
                    <TouchableHighlight
                        style = {{marginTop :12}}
                        underlayColor = 'none'
                        onPress={() => navigation.dispatch(
                            StackActions.push('findAddressPage')
                        )}>
                        <Text style={{ color: '#0c2461', }}>
                            {address}
                        </Text>
                    </TouchableHighlight> :
                    
                    <TouchableHighlight
                        style={{ marginTop: 20 }}
                        underlayColor='none'
                        onPress={() => navigation.dispatch(
                            StackActions.push('findAddressPage')
                        )}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon props={['antdesign', 'search1', 18, '#0c2461']} />
                            <Text style={{ color: '#0c2461' }}>
                                주소검색
                            </Text>
                        </View>
                    </TouchableHighlight>
                }

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
                                    borderWidth: select.checked ? 1 : 0.5,
                                    borderRadius: 5,
                                    backgroundColor: 'white',
                                    borderColor: select.checked ? '#0c2461' : 'silver',
                                }}>
                                <Text style={{
                                    textAlign: 'center',
                                    paddingVertical: 5,
                                    color: select.checked ? '#0c2461' : 'darkgray',
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