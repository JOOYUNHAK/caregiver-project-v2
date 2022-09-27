/* 간병인 추가요금이 발생하는 경우 */

import { StyleSheet, Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { saveExtraFee } from "../../redux/action/register/lastRegisterAction";
import RegisterHelpText from "../RegisterHelpText";

export default function ExtraFee() {
    const dispatch = useDispatch();
    return (
        <View style={styles.extraFee}>
            <Text style={{ fontSize: 15 }}>
                혹시, 추가요금이 붙는 상황이 있나요?
            </Text>
            <RegisterHelpText helpText={'자세할수록 보호자분들의 선택에 도움이 돼요.'} />
            <RegisterHelpText helpText={'여러상황이 있는 경우 ,(쉼표)로 구분해서 작성해주세요.'} />
            <TextInput
                maxLength={30}
                onChangeText={(text) => dispatch(saveExtraFee(text))}
                style={styles.extraFeeTextInput}
                placeholder='Ex) 폐쇄병동으로 옮길 경우, 추가 요금은 없습니다.'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    extraFee: {
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom:20,
        width: wp('100%')
    },

    extraFeeTextInput: { 
        borderBottomColor: 'silver', 
        borderBottomWidth: 0.5, 
        width: '100%', 
        fontSize: 14, 
        paddingVertical: 1, 
        paddingLeft: 3, 
        marginTop: 5 
    }
})