/* 회원가입 완료 버튼 */

import { useState, useEffect } from "react";
import {  StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { useSelector, shallowEqual} from "react-redux";

export default function CompleteRegisterBtn({ navigation }) {
    const [isFill, setIsFill] = useState(false);
    const { suction, toilet, bedsore, meal, washing, bathChair} = useSelector(
        state => ({
            suction: state.lastRegister.suction,
            toilet: state.lastRegister.toilet,
            bedsore: state.lastRegister.bedsore,
            washing: state.lastRegister.washing,
            meal: state.lastRegister.protector.meal,
            bathChair: state.lastRegister.protector.bathChair,
        }),
        shallowEqual
    )

    useEffect(() => {
        console.log(suction, toilet, bedsore, washing, meal, bathChair)
        suction && toilet && bedsore && meal 
            && washing && bathChair ? setIsFill(true) : setIsFill(false)
    }, [ suction, toilet, bedsore, meal, washing, bathChair ])
    return (
        <View style={styles(isFill).completeBtn}>
            <TouchableHighlight
                disabled = {isFill ? false : true }
                underlayColor='none'
                onPress={() => console.log()}>
                <Text style= {styles(isFill).completeBtnText}>
                    가입할래요
                </Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = (isFill) => StyleSheet.create({
    completeBtn: {
        marginTop: hp('5%'), 
        alignSelf: 'center', 
        borderRadius: 5, 
        width: wp('90%'), 
        marginLeft: wp('5%'),
        backgroundColor: isFill ? '#78e7b9' : '#c0f3dc'
    },
    completeBtnText: {
        paddingHorizontal: wp('15%'), 
        paddingVertical: 17, 
        textAlign: 'center',
        color:'white'
    }
})