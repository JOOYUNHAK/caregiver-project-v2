/* 활동보조사 함께 시간 보내기 입력 */
import { StyleSheet, Text, TextInput,  View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { saveWithPatient } from '../../../redux/action/register/lastRegisterAction'; 

export default function WithPatient() {
    const dispatch = useDispatch();
    return (
        <View style={styles.withPatient}>
            <Text>
                저는 주어진 시간에 주로 이렇게 환자분과 시간을 보내요.
            </Text>
            <TextInput
                maxLength={30}
                onChangeText = {(text) => dispatch(saveWithPatient(text))}
                style={styles.withPatientTextInput}
                placeholder='Ex) 특별한 요구사항이 없으면 환자분과 밖에서 산책을 해요.'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    withPatient: {
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
        height: hp('10%'), 
        marginTop: 30, 
        paddingHorizontal: 20 
    },

    withPatientTextInput: {
        borderBottomWidth: 0.5, 
        borderBottomColor: 'silver', 
        paddingVertical: 5, 
        fontSize: 13, 
        paddingLeft: 3, 
        marginTop: 15, 
        width: wp('90%')
    }
})