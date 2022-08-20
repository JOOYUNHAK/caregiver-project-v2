/* 보호자용 2번째 회원가입 환자가 받은 진단명 입력 */
import { Text, StyleSheet, TextInput, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { saveDiagnosis } from "../../../redux/action/register/secondRegisterAction";
import inputStyle from "../../../styles/Register/inputStyle";

export default function PatientDiagnosis() {
    const dispatch = useDispatch();
    return (
        <View style={styles.diagnosis}>
            <Text >
                환자분이 받은 진단명
            </Text>
            <TextInput
                maxLength={25}
                placeholder="Ex) 뇌출혈, 급성 심근경색, 지주막하 출혈"
                style={[inputStyle('startDate'), { width: wp('90%') }]}
                onChangeText={(text) => dispatch(saveDiagnosis(text))} />
        </View>
    );
}

const styles = StyleSheet.create({
    diagnosis: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: hp('12%'),
        paddingLeft: 20
    },
})