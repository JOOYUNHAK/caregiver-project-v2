/* 토큰 관련 함수들 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import api from "../config/CustomAxios";
import { logout, saveUser } from "../redux/action/user/userAction";

export async function validateToken() {
    const dispatch = useDispatch();
    try {
        //await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
        const res = await api.post('/auth');
        const user = res.data;
        dispatch(saveUser(user));
    }
    catch (err) {
        console.log(err.response)
        const statusCode = err.response.data.statusCode;
        switch (statusCode) {
            //헤더에 토큰 정보가 없는 경우, 유효하지 않은 토큰일 경우, 토큰에서 요청하는 아이디를 찾을 수 없는 경우
            //전부 로그아웃 처리하고 asyncstorage 초기화
            case 400:
            case 404:
                await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
                dispatch(logout());
                break;
        }
    }
};