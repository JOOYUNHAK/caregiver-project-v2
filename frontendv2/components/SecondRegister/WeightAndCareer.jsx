/* 간병인용 몸무게, 경력 입력 */

import { StyleSheet, Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { saveCareer, saveWeight } from "../../redux/action/register/caregiverInfoAction";
import inputStyle from "../../styles/Register/inputStyle";

export default function WeightAndCareer() {
    const dispatch = useDispatch();
    const { weight, career } = useSelector(state => ({
        weight: state.caregiverInfo.weight,
        career: state.caregiverInfo.career
    }))

    return (
        <View style={styles.weightAndCareer}>
            <View style={styles.weight}>
                <Text>
                    몸무게는
                </Text>
                <TextInput
                    maxLength={3}
                    value = {String(weight)}
                    onChangeText={(text) => dispatch(saveWeight(text))}
                    style={inputStyle('weight')}
                    keyboardType='decimal-pad'
                />
                <Text>
                    (Kg)
                </Text>
            </View>

            <View style={styles.career}>
                <Text>
                    경력은
                </Text>
                <TextInput
                    value={String(career)}
                    onChangeText={(text) => dispatch(saveCareer(text))}
                    style={inputStyle('career')}
                    keyboardType='decimal-pad'
                />
                <Text>
                    (개월)
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    weightAndCareer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: 10,
        height: hp('8%'),
        paddingLeft: 20
    },

    weight: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    career: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10
    },
})
