/* 보호자용 2번째 회원가입 페이지 다음으로 가는 버튼 */
import { useEffect, useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { shallowEqual, useSelector } from "react-redux";

export default function NextRegisterBtn({ navigation }) {
    const [isFill, setIsFill] = useState(false);
    const {weight, patientSex, diagnosis, startPeriod, place, isNext, patientState} = useSelector(
        state => ({
            weight: state.patientInfo.weight,
            patientSex: state.patientInfo.patientSex,
            diagnosis: state.patientInfo.diagnosis,
            startPeriod: state.patientInfo.startPeriod,
            place: state.patientInfo.place,
            isNext: state.patientInfo.isNext,
            patientState: state.patientInfo.patientState,
        }),
        shallowEqual
    );

    useEffect(() => {
        weight && patientSex && diagnosis && place && startPeriod
            && (isNext == false || isNext == true) && patientState ? setIsFill(true) : setIsFill(false)
    },[ weight, patientSex, diagnosis, startPeriod, place, isNext, patientState ])

    return (
        <View style={{ height: hp('10%') }}>
            <TouchableHighlight
                underlayColor='none'
                disabled = {isFill ? false : true}
                onPress={() => navigation.push('lastRegisterPage')}
                style={{ 
                    width: wp('90%'),
                    alignSelf: 'center',
                    borderRadius: 10, 
                    backgroundColor: isFill ? 'rgba(65, 92, 118, 0.85)' : 'rgba(65, 92, 118, 0.25)'
                }}
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