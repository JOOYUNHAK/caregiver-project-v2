/* 간병인용 다음 병원 질문 입력 */
import { StyleSheet, Text, TextInput,  View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { saveNextHospital } from "../../../redux/action/register/caregiverInfoAction";
import inputStyle from "../../../styles/Register/inputStyle";

export default function NextHospital() {
    const dispatch = useDispatch();
    const { nextHospital } = useSelector(state => ({
        nextHospital: state.caregiverInfo.nextHospital,
    }))
    return (
        <View style={styles.nextHospital}>
            <Text>
                보호자분이 연장을 원할경우 가능하신가요?
            </Text>
            <TextInput
                onChangeText={(text) => dispatch(saveNextHospital(text))}
                value={nextHospital}
                style={inputStyle('nextHospital')}
                placeholder='Ex) 활동 지역이면 가능합니다, 연장은 불가능합니다'
                maxLength={25}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    nextHospital: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: hp('12%'),
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 10
    },
})
