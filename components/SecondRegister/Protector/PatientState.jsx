/* 보호자용 2번째 회원가입 환자 몸상태 입력 */
import { StyleSheet, Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { savePatientState } from "../../../redux/action/register/secondRegisterAction";

export default function PatientState() {
    const dispatch = useDispatch();
    return (
        <View style={styles.patientState}>
            <Text>
                환자분의 현재 몸상태를 작성해주세요.
            </Text>
            <TextInput
                onChangeText={(text) => dispatch(savePatientState(text))}
                multiline={true}
                autoCorrect={false}
                placeholder=
                'Ex) 현재 뇌출혈 이후 인지가 조금 떨어지며, 시력도 많이 떨어져 있습니다. 연하장애가 있어 아직 음식을 삼키는데 많이 힘이 듭니다.'
                style={styles.patientStateInput}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    patientState: {
        height: hp('30%'),
        width: wp('100%'),
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 20
    },

    patientStateInput: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 15,
        borderWidth: 0.5,
        borderRadius: 5,
        width: wp('90%'),
        overflow: 'scroll',
        height: hp('20%'),
        textAlignVertical: 'top' //ios multline
    }
})