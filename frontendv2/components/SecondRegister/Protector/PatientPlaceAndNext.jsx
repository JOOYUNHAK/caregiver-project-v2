/* 보호자용 2번째 회원가입 환자 케어 장소 및 다음 병원 이동 여부 */

import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import resetArrayData from "../../../functions/resetArrayData";
import { saveIsNext, savePlace } from "../../../redux/action/register/patientInfoAction";
import isNextData from "../../../data/Register/SecondRegister/isNext.data";
import { useNavigation, StackActions, useRoute } from "@react-navigation/native";
import Icon from "../../Icon";

export default function PatientPlaceAndNext() {
    const [isNextHospital, setIsNextHospital] = useState(isNextData);
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        if(route?.params?.address) {
            const address = route.params.address;
            setAddress(route.params.address);
            dispatch(savePlace(address));
        }
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
                    케어하게 될 장소
                </Text>

                {address ?
                    <TouchableHighlight
                        style={{ marginTop: 12 }}
                        underlayColor='none'
                        onPress={() => navigation.dispatch(
                            StackActions.push('findAddressPage')
                        )}>
                        <Text style={{ color: '#0c2461', }}>
                            {address}
                        </Text>
                    </TouchableHighlight> :

                    <TouchableHighlight
                        style={styles.searchAddress}
                        underlayColor='none'
                        onPress={() => navigation.dispatch(
                            StackActions.push('findAddressPage')
                        )}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon props={['antdesign', 'search1', 17, 'darkgray']} />
                            <Text style={{ 
                                color: 'darkgray', 
                                marginLeft: 5, 
                                fontSize: 13 
                            }}>
                                주소를 입력해주세요
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
    },

    searchAddress: {
        marginTop: 11,
        borderRadius: 15,
        paddingLeft: 6,
        paddingVertical: 6,
        width: '85%',
        borderColor: 'darkgray',
        borderWidth: 0.6
    }
})