/* 내 계정 관리 logout 부분 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { TouchableHighlight } from "react-native";
import { heightPercentageToDP as hp} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { resetHeartList } from "../../../redux/action/profile/profileAction";
import { saveIsAuthed } from "../../../redux/action/register/firstRegisterAction";
import { logout } from "../../../redux/action/user/userAction";

export default function Logout({ navigation }) {
    const dispatch = useDispatch();

    return (
        <TouchableHighlight
            style={{ heigh: hp('6%') }}
            underlayColor='none'
            onPress={async () => {
                dispatch(logout()); //현재 유저정보 리셋
                dispatch(saveIsAuthed(false)); //휴대폰 인증 여부 리셋
                dispatch(resetHeartList()); // 찜 목록 초기화
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