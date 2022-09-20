/* 보호자용 2번째 회원가입 환자가 받은 진단명 입력 */
import { Text, StyleSheet, TextInput, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { saveDiagnosis, savePeriod } from "../../../redux/action/register/secondRegisterAction";
import inputStyle from "../../../styles/Register/inputStyle";

export default function PatientDiagnosis() {
    const dispatch = useDispatch();
    return (
        <View style = {{ flexDirection: 'row', width:wp('90%'), paddingLeft: 20, justifyContent: 'space-around'}}>
            <View style={styles.diagnosis}>
                <Text >
                    환자분이 받은 진단명
                </Text>
                <TextInput
                    maxLength={25}
                    placeholder="Ex) 뇌출혈, 뇌경색"
                    style={[inputStyle('startDate'),]}
                    onChangeText={(text) => dispatch(saveDiagnosis(text))} />
            </View>

            <View style={styles.period}>
                <Text >
                    예상 기간
                </Text>
                <TextInput
                    maxLength={25}
                    placeholder="9월 21일 ~ 10월 3일"
                    style={[inputStyle('startDate'),]}
                    onChangeText={(text) => dispatch(savePeriod(text))} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    diagnosis: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: hp('12%'),
        width: '45%'
    },

    period: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: hp('12%'),
        width: '45%',
        marginLeft: 20
    }
})