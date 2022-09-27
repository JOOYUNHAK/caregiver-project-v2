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
            weight: state.secondRegister.weight,
            career: state.secondRegister.career,
            firstPay: state.secondRegister.careGiver.firstPay,
            startDate: state.secondRegister.startDate,
            nextHospital: state.secondRegister.careGiver.nextHospital,
            possibleArea: state.secondRegister.possibleArea,
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
                    borderRadius: 10, 
                    backgroundColor: isFill ? '#78e7b9' : '#c0f3dc' }}
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