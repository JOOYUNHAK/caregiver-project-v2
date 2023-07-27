/* 토큰 관련 함수들 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import store from "../redux/store";
import api from "../config/CustomAxios";
import { logout, saveUser } from "../redux/action/user/userAction";
import requestLogout from "./requestLogout";

export async function validateToken(navigation) {

    try {
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
 * @param navigation accessToken 갱신에 실패할 경우 로그아웃 시키고 loginPage  
 * @returns accessToken 갱신에 성공하면 true
 */
export async function requestRefreshToken(navigation) {

    const refreshToken = await AsyncStorage.getItem('refreshToken');

    if (refreshToken) {
        try {
            const res = await api.post(`/auth/refresh`, {
                refreshKey: refreshToken
            });
            const { accessToken, refreshKey, name } = res.data;

            await AsyncStorage.multiSet([['accessToken', accessToken], ['refreshToken', refreshKey], ['name', name]]);
            store.dispatch(saveUser(name));
            return true;
        }
        catch (err) {
            await requestLogout(navigation);
        }
    }
    else{
       await requestLogout(navigation);
    }
}

export async function getLoginState() {

    if (await AsyncStorage.getItem('accessToken')) {
        return true
    }
    else return false;
}