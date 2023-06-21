/* 보호자용 회원가입 완료 버튼 */

import { Platform } from "react-native";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP } from "react-native-responsive-screen"
import { useSelector, shallowEqual } from "react-redux";
import requestCreateUser from "../../../functions/Register/requestCreateUser";

export default function CompleteRegisterBtn({ navigation }) {
    const { firstRegister, patientInfo, patientHelpList } = useSelector(
        state => ({
            firstRegister: state.firstRegister.user,
            patientInfo: state.patientInfo,
            patientHelpList: state.patientHelpList
        }),
        shallowEqual
    )

    return (
            <TouchableHighlight
                underlayColor='none'
                style={{ 
                    marginVertical: hp('3%'),
                    width: wp('90%'),
                    marginLeft :20,
                    alignSelf: 'center',
                    borderRadius: 10, 
                    backgroundColor: 'rgba(65, 92, 118, 0.85)' 
                }}
                onPress={async () =>
                    await requestCreateUser(
                        {
                            firstRegister,
                            patientInfo,
                            patientHelpList
                        },
                        navigation
                    )
                   }>
            <Text style={{ 
                    textAlign: 'center', 
                    fontSize: Platform.OS === 'ios' ? 13 : 16,
                    color: 'white',
                    paddingVertical: 15 }}>
                가입할래요
            </Text>
        </TouchableHighlight>
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