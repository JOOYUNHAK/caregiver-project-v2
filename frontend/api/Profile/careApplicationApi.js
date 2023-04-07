/* 간병 신청 api */

import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../config/CustomAxios";
import { requestRefreshToken } from "../../functions/Token";
import store from "../../redux/store";

export default async function careApplication(navigation) {
    
    try {
        const res = await api.post('auth/application')
    }
    catch (err) {
        const statusCode = err.response.data.statusCode;
        switch (statusCode) {
            //헤더에 토큰 정보가 없는 경우, 유효하지 않은 토큰일 경우, 토큰에서 요청하는 아이디를 찾을 수 없는 경우
            //전부 로그아웃 처리하고 asyncstorage 초기화
            case 400:
            case 404:
                await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
                store.dispatch(logout());
                break;
            //간병 신청을 간병인이 이용했을 경우
            case 403:
                const message = err.response.data.message
                return { message };
            //만료된 토큰일 경우
            case 401:
                if (await requestRefreshToken(navigation)) {
                    await careApplication(navigation);
                }
                break;
        }
    }
} 