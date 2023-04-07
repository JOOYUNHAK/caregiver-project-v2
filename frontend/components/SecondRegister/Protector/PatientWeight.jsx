/* 보호자용 2번째 회원가입 환자 몸무게 입력 */
import { View, Text, TextInput, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { saveWeight } from "../../../redux/action/register/secondRegisterAction";
import inputStyle from "../../../styles/Register/inputStyle";

export default function PatientWeight() {
    const dispatch = useDispatch();
    return (
        <View style={styles.patientWeight}>
            <Text>
                환자분의 몸무게는
            </Text>
            <TextInput
                keyboardType='decimal-pad'
                maxLength={3}
                onChangeText={(text) => dispatch(saveWeight(text))}
                style={[inputStyle('weight'), { width: wp('10%') }]}
            />
            <Text>
                (kg)
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({

    patientWeight: {
        height: hp('10%'),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 20
    },

})