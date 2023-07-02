/* 간병인 회원가입 다음 단계 버튼 */

import { useEffect } from "react";
import { useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { shallowEqual, useSelector } from "react-redux";

export default function NextRegisterBtn({ navigation }) {
    const [isFill, setIsFill] = useState(false);
    
    const {weight, career, firstPay, startDate, nextHospital, possibleArea} = useSelector(
        state => ({
            weight: state.caregiverInfo.weight,
            career: state.caregiverInfo.career,
            firstPay: state.caregiverInfo.pay,
            startDate: state.caregiverInfo.possibleDate,
            nextHospital: state.caregiverInfo.nextHospital,
            possibleArea: state.caregiverInfo.possibleAreaList,
        }),
        shallowEqual
    );

    useEffect(() => {
        weight && career && firstPay && startDate && nextHospital 
            && possibleArea.length ? setIsFill(true) : setIsFill(false)
    }, [ weight, career, firstPay, startDate, nextHospital, possibleArea ])

    return (
        <View style={{ height: hp('10%') }}>
            <TouchableHighlight
                underlayColor='none'
                disabled = {isFill ? false : true} 
                onPress={() => navigation.push('lastRegisterPage')}
                style={{ 
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: 20,
                    borderRadius: 10, 
                    backgroundColor: isFill ? 'rgba(65, 92, 118, 0.85)' : 'rgba(65, 92, 118, 0.25)'}}
            >
                <Text style={{ 
                    textAlign: 'center', 
                    fontSize: Platform.OS === 'ios' ? 13 : 16,
                    color: 'white',
                    paddingVertical: 15 }}>
                    다음
                </Text>
            </TouchableHighlight>
        </View>
    )
}