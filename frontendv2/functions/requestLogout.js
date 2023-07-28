import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../config/CustomAxios";
import { logout } from "../redux/action/user/userAction";
import store from "../redux/store";
import { StackActions } from "@react-navigation/native";

/* 공통 로그아웃 */
export default async function requestLogout(navigation) {
    try {
        await api.post('auth/logout');
    }
    finally {
        /* AsyncStorage에 있는 값들 모두 지우고  */
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'name']);
        store.dispatch(logout());
        navigation.dispatch(
            StackActions.push('loginPage')
        );
    }
}