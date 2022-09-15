/* 내 계정 관리 logout 부분 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { TouchableHighlight } from "react-native";
import { heightPercentageToDP as hp} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/action/user/userAction";

export default function Logout({ navigation }) {
    const dispatch = useDispatch();

    return (
        <TouchableHighlight
            style={{ heigh: hp('6%') }}
            underlayColor='none'
            onPress={async () => {
                dispatch(logout());
                await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
                navigation.dispatch(
                    StackActions.pop()
                );
            }}
        >
            <View style={styles.eachPart}>
                <Text style={{ fontSize: 16, fontWeight: '400' }}>
                    로그아웃
                </Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({

    eachPart: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp('6%'),
    }

})