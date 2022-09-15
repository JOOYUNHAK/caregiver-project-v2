/* 회원가입 완료 버튼 */

import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { useSelector, shallowEqual } from "react-redux";
import requestCreateUser from "../../../functions/Register/requestCreateUser";

export default function CompleteRegisterBtn({ navigation }) {
    const { firstRegister, secondRegister, lastRegister } = useSelector(
        state => ({
            firstRegister: state.firstRegister.user,
            secondRegister: state.secondRegister,
            lastRegister: state.lastRegister
        }),
        shallowEqual
    )

    return (
        <View style={styles.completeBtn}>
            <TouchableHighlight
                underlayColor='none'
                onPress={async () =>
                    await requestCreateUser(
                        {
                            firstRegister,
                            secondRegister,
                            lastRegister
                        },
                        navigation
                    )
                   }>
            <Text style={styles.completeBtnText}>
                가입할래요
            </Text>
        </TouchableHighlight>
        </View >
    )
}

const styles = StyleSheet.create({
    completeBtn: {
        marginTop: hp('5%'),
        alignSelf: 'center',
        borderRadius: 5,
        width: wp('90%'),
        backgroundColor: '#78e7b9'
    },
    completeBtnText: {
        paddingHorizontal: wp('15%'),
        paddingVertical: 15,
        textAlign: 'center',
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 13 : 16
    }
})