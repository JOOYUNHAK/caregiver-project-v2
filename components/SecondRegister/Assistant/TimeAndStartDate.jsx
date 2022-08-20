/* 활동보조사 구하는 시간, 시작 날짜 입력 */
import { StyleSheet, Text, TextInput, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { saveStartDate, saveTime } from "../../../redux/action/register/secondRegisterAction";
import inputStyle from "../../../styles/Register/inputStyle";

export default function TimeAndStartDate() {
    const dispatch = useDispatch();
    return (
        <View style={styles.timeAndStartDate}>
            <View style={styles.time}>
                <Text>
                    현재 희망 시간
                </Text>
                <TextInput
                    onChangeText={(text) => dispatch(saveTime(text))}
                    style={[inputStyle('startDate'), {width: '90%'}]}
                    placeholder = 'Ex) 월,수,금 11시~16시'
                    maxLength={20}
                />
            </View>

            <View style={styles.startDate}>
                <Text>
                    시작 가능 날짜
                </Text>
                <TextInput
                    onChangeText={(text) => dispatch(saveStartDate(text))}
                    style={[inputStyle('startDate'), {width: '90%'}]}      
                    placeholder='Ex) 2주뒤부터, 8월 9일부터'
                    maxLength={20}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    timeAndStartDate: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        height: hp('11%'),
        paddingTop: 8,
        paddingLeft: 20,  
    },

    time: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
    },

    startDate: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1
    },
})