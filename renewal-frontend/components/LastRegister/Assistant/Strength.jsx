/* 활동보조사용 강점 입력 부분 */
import { StyleSheet } from "react-native";
import { Text, TextInput, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { saveStrength1, saveStrength2 } from '../../../redux/action/register/lastRegisterAction'; 
import RegisterHelpText from '../../RegisterHelpText';

export default function Strength() {
    const dispatch = useDispatch();
    return (
        <View style={styles.strength}>
            <Text>
                저는 다른 분들보다 이 부분이 강점이에요.
            </Text>
            <RegisterHelpText helpText={'꼭 작성하지 않으셔도 되는 항목이에요.'} />
            <View style={styles.eachContent}>
                <TextInput
                    maxLength={30}
                    onChangeText = {(text) => dispatch(saveStrength1(text))}
                    style={styles.eachContentInput}
                    placeholder='Ex) 심리상담사 자격증이 있어 환자분의 심리를 잘 파악할 수 있어요.'
                />
                <TextInput
                    maxLength={30}
                    onChangeText = {(text) => dispatch(saveStrength2(text))}
                    style={styles.eachContentInput}
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
        height: hp('20%'),
        padding: 20
    },

    eachContent: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingBottom: 10,
        height: '95%',
    },

    eachContentInput: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
        paddingVertical: 2,
        fontSize: 13,
        paddingLeft: 3
    }
})