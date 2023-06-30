/* 간병인용 회원가입 마지막 강점 입력 */
import { StyleSheet } from "react-native";
import { Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { saveStrength1, saveStrength2} from '../../../redux/action/register/caregiverThirdRegisterAction'; 
import RegisterHelpText from "../../RegisterHelpText";

export default function Strength() {
    const dispatch = useDispatch();
    return (
        <View style={styles.strength}>
            <Text >
                회원님만의 강점이 있다면 적어주세요
            </Text>
            <RegisterHelpText helpText={'꼭 작성하지 않으셔도 되는 항목이에요.'} />
            <View style={styles.eachStrength}>
                <TextInput
                    maxLength={30}
                    onChangeText={(text) => dispatch(saveStrength1(text))}
                    style={styles.eachStrengthInput}
                    placeholder='Ex) 대학병원 경험이 많아 일과 시스템을 잘 알아요.'
                />
                <TextInput
                    maxLength={30}
                    onChangeText={(text) => dispatch(saveStrength2(text))}
                    style={styles.eachStrengthInput}
                    placeholder='Ex) 경락마사지 자격증이 있어 간단하게 할 수 있어요.'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({ 
    strength: {
        width: wp('100%'),
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
        height: hp('22%'), 
        marginTop: 5,
        padding: 20,
        marginBottom: 5
    },

    eachStrength: {
        width: '100%', 
        flexDirection: 'column', 
        justifyContent: 'space-around', 
        paddingBottom: 20, 
        height: '95%', 
    },

    eachStrengthInput: {
        borderBottomWidth: 0.5, 
        borderBottomColor: 'silver', 
        paddingVertical: 2, 
        fontSize: 13, 
        paddingLeft: 3
    }
})