/* 회원가입 완료 화면 */

import { useNavigation, CommonActions } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { firstRegisterReset } from "../../redux/action/register/firstRegisterAction";
import { lastRegisterReset } from "../../redux/action/register/lastRegisterAction";
import { secondRegisterReset } from "../../redux/action/register/secondRegisterAction";

export default function RegisterCompletePage() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const completeRegister = () => {
        dispatch(firstRegisterReset());
        dispatch(secondRegisterReset());
        dispatch(lastRegisterReset());
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{name: 'tabNavigator'}]
            })
        )
    }

    return (
        <View style={styles.container}>
            <Text style={{
                marginTop: hp('30%'),
                fontSize: 24,
                color: 'darkgray'
            }}>
                믿음으로,
            </Text>
            <Text style={{
                fontSize: 26,
                marginTop: 5,
                color: 'darkgray'
            }}>
                환영합니다
            </Text>

            <TouchableHighlight style={styles.btn}
                underlayColor = 'none'
                onPress={() => completeRegister()}
            >
                <Text style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: 'whitesmoke'
                }}>
                    시작하기
                </Text>

            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    btn: {
        marginTop: hp('50%'),
        paddingVertical: 17,
        borderRadius: 5,
        backgroundColor: '#71b6df',
        width: wp('90%')
    }
})