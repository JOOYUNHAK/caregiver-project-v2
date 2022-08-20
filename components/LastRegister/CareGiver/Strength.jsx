/* 간병인용 회원가입 마지막 강점 입력 */
import { StyleSheet } from "react-native";
import { Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { saveStrength1, saveStrength2} from '../../../redux/action/register/lastRegisterAction'; 

export default function Strength() {
    const dispatch = useDispatch();
    return (
        <View style={styles.strength}>
            <Text style={{ paddingLeft: 20 }}>
                저는 다른 분들보다 이 부분이 강점이에요.
            </Text>
            <View style={styles.eachStrength}>
                <TextInput
                    maxLength={30}
                    onChangeText={(text) => saveStrength1(text)}
                    style={styles.eachStrengthInput}
                    placeholder='Ex) 대학병원 경험이 많아 일과 시스템을 잘 알아요.'
                />
                <TextInput
                    maxLength={30}
                    onChangeText={(text) => saveStrength2(text)}
                    style={styles.eachStrengthInput}
                    placeholder='Ex) 경락마사지 자격증이 있어 간단하게 할 수 있어요.'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({ 
    strength: {
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
        height: hp('18%'), 
        marginTop: 20 
    },

    eachStrength: {
        width: wp('100%'), 
        flexDirection: 'column', 
        justifyContent: 'space-around', 
        paddingBottom: 10, 
        height: '95%', 
        paddingHorizontal: 20 
    },

    eachStrengthInput: {
        borderBottomWidth: 0.5, 
        borderBottomColor: 'silver', 
        paddingVertical: 5, 
        fontSize: 13, 
        paddingLeft: 3
    }
})