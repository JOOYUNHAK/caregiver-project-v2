/* 회원가입 완료 버튼 */

import {  StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { useSelector, shallowEqual} from "react-redux";
import requestCreateUser from "../../../functions/Register/requestCreateUser";

export default function CompleteRegisterBtn({ navigation }) {
    const { firstRegister, patientWeight, protectorSecondRegister, suction, toilet, bedsore, meal, washing, bathChair} = useSelector(
        state => ({
            firstRegister: state.firstRegister.user,
            patientWeight: state.secondRegister.weight,
            protectorSecondRegister: state.secondRegister.protector,
            suction: state.lastRegister.suction,
            toilet: state.lastRegister.toilet,
            bedsore: state.lastRegister.bedsore,
            washing: state.lastRegister.washing,
            meal: state.lastRegister.protector.meal,
            bathChair: state.lastRegister.protector.bathChair,
        }),
        shallowEqual
    )

    return (
        <View style={styles.completeBtn}>
            <TouchableHighlight
                underlayColor='none'
                onPress={() => 
                    requestCreateUser(
                        {
                            firstRegister, 
                            secondRegister: {
                                patientWeight,
                                protectorSecondRegister
                            },
                            lastRegister: {
                                suction,
                                toilet,
                                bedsore, 
                                washing,
                                meal,
                                bathChair
                            }
                        }
                    )}>
                <Text style= {styles.completeBtnText}>
                    가입할래요
                </Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    completeBtn: {
        marginTop: hp('5%'), 
        alignSelf: 'center', 
        borderRadius: 5, 
        width: wp('90%'), 
        marginLeft: wp('5%'),
        backgroundColor:  '#78e7b9'
    },
    completeBtnText: {
        paddingHorizontal: wp('15%'), 
        paddingVertical: 17, 
        textAlign: 'center',
        color:'white'
    }
})