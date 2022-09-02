/* 간병인용 급여, 시작 날짜 입력 */
import { StyleSheet, Text, TextInput,  View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { saveFirstPay, saveSecondPay, saveStartDate } from "../../../redux/action/register/secondRegisterAction";
import inputStyle from "../../../styles/Register/inputStyle";

export default function PayAndStartDate() {
    const dispatch = useDispatch();
    return (
        <View style={styles.payAndStartDate}>
            <View style={styles.pay}>
                <Text>
                    일일급여
                </Text>
                <View style={styles.inputPay}>
                    <TextInput
                        onChangeText={(text) => dispatch(saveFirstPay(text))}
                        style={inputStyle('pay')}
                        maxLength={3}
                        keyboardType='decimal-pad'
                    />
                    <Text >
                        만원
                    </Text>
                    <Text style={{ marginLeft: 5, marginRight: 8 }}>
                        ~
                    </Text>
                    <TextInput
                        onChangeText={(text) => dispatch(saveSecondPay(text))}
                        style={inputStyle('pay')}
                        maxLength={3}
                        keyboardType='decimal-pad'
                    />
                    <Text>
                        만원
                    </Text>
                </View>
            </View>

            <View style={styles.startDate}>
                <Text>
                    시작 가능 날짜
                </Text>
                <TextInput
                    onChangeText={(text) => dispatch(saveStartDate(text))}
                    style={inputStyle('startDate')}
                    placeholder='Ex) 2주뒤부터, 8월 9일부터'
                    maxLength={8}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    payAndStartDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: hp('12%'),
        paddingTop: 8,
        paddingLeft: 20,
        paddingRight: 10
    },

    pay: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
    },

    inputPay: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10
    },

    startDate: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1
    },
})