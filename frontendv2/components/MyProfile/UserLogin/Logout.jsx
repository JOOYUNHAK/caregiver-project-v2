/* 내 계정 관리 logout 부분 */

import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { TouchableHighlight } from "react-native";
import { useDispatch } from 'react-redux';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import api from "../../../config/CustomAxios";
import { logout } from "../../../redux/action/user/userAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";

export default function Logout({ navigation }) {
    const dispatch = useDispatch();

    /* 로그아웃 시도 시 에러가 나면 무조건 로그아웃 처리 */
    const pressLogoutBtn = async () => {
        try {
            const res = await api.post('auth/logout');
        }
        finally {
            dispatch(logout()); //현재 유저정보 리셋
            await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'name']);
            navigation.dispatch(
                StackActions.pop()
            );
        }
    }

    return (
        <TouchableHighlight
            style={{ heigh: hp('6%') }}
            underlayColor='none'
            onPress={() => pressLogoutBtn()}
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