/* 토큰 관련 함수들 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, StackActions, useNavigation } from "@react-navigation/native";
import store from "../redux/store";
import api from "../config/CustomAxios";
import { logout, saveUser } from "../redux/action/user/userAction";

export async function validateToken(navigation) {

    try {
        //await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
        const res = await api.post('/auth');
        const user = res.data;
        store.dispatch(saveUser(user));
        return true;
    }
    catch (err) {
        console.log(err.response.data)
        const statusCode = err.response.data.statusCode;
        switch (statusCode) {
            //헤더에 토큰 정보가 없는 경우, 유효하지 않은 토큰일 경우, 토큰에서 요청하는 아이디를 찾을 수 없는 경우
            //전부 로그아웃 처리하고 asyncstorage 초기화
            case 400:
            case 404:
                await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
                store.dispatch(logout());
                break;
            //만료된 토큰일 경우
            case 401:
                return await requestRefreshToken(navigation)
        }
        return false;
    }
};

/**
 * 사용자가 가지고 있는 refreshToken Index로 accessToken 갱신 시켜주는 함수
 * @param navigation accessToken 갱신에 실패할 경우 loginPage  이동위해 
 * @returns accessToken 갱신에 성공하면 true
 */
export async function requestRefreshToken(navigation) {
    
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    //console.log(refreshToken);
    if (refreshToken !== null) {
        try {
            const res = await api.get(`/auth/refreshToken/${refreshToken}`);
            const user = res.data.user;
            //console.log(res.data)
            const accessToken = res.data.accessToken;
            await AsyncStorage.setItem('accessToken', accessToken);
            store.dispatch(saveUser(user));
            return true;
        }
        catch (err) {
            await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
            store.dispatch(logout());
            //console.log(err.response.data)
            navigation.dispatch(
                StackActions.push('loginPage')
            )
        }
    }
    else
        navigation.dispatch(
            StackActions.push('loginPage')
        )
}

export async function getLoginState() {

    if (await AsyncStorage.getItem('accessToken')) {
        return true
    }
    else return false;
}