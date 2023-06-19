/* 활동보조사 회원가입 다음 단계 버튼 */

import { useEffect, useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { shallowEqual, useSelector } from "react-redux";

export default function NextRegisterBtn({ navigation }) {
    const [isFill, setIsFill] = useState(false);
    const {weight, career, time, startDate, training, possibleArea} = useSelector(
        state => ({
            weight: state.secondRegister.weight,
            career: state.secondRegister.career,
            time: state.secondRegister.assistant.time,
            //startDate: state.secondRegister.startDate,
            training: state.secondRegister.assistant.training,
            possibleArea: state.secondRegister.possibleArea,
        }),
        shallowEqual
    );

    useEffect(() => {
        weight && career && time && training.length 
            && possibleArea.length ? setIsFill(true) : setIsFill(false)
    },[ weight, career, time, training, possibleArea ])

    return (
        <View style={{ height: hp('10%'), marginTop: -20 }}>
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