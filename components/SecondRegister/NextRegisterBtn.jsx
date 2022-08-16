/* 회원가입 다음 단계 버튼 */
import { useEffect } from "react";
import { useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { shallowEqual, useSelector } from "react-redux";

export default function NextRegisterBtn({ navigation }) {
    const [isFill, setIsFill] = useState(false);
    const {weight, career, firstPay, secondPay, startDate, nextHospital, possibleArea, license} = useSelector(
        state => ({
            weight: state.secondRegister.weight,
            career: state.secondRegister.career,
            firstPay: state.secondRegister.careGiver.firstPay,
            secondPay: state.secondRegister.careGiver.secondPay,
            startDate: state.secondRegister.startDate,
            nextHospital: state.secondRegister.careGiver.nextHospital,
            possibleArea: state.secondRegister.possibleArea,
            license: state.secondRegister.license,
        }),
        shallowEqual
    );

    useEffect(() => {
        console.log(license)
        weight && career && firstPay && secondPay && startDate && nextHospital 
            && possibleArea.length && license.length ? setIsFill(true) : setIsFill(false)
    }, [ weight, career, firstPay, secondPay, startDate, nextHospital, possibleArea, license ])

    return (
        <View style={{ height: hp('10%') }}>
            <TouchableHighlight
                underlayColor='none'
                onPress={() => navigation.push('secondRegisterPage')}
                style={{ 
                    marginLeft: 10, 
                    marginRight: 10, 
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