/* 회원가입 유저 생성 요청 보내기 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import api from "../../config/CustomAxios";
import { saveUser } from "../../redux/action/user/userAction";
import store from "../../redux/store";

export default async function requestCreateUser(RegisterData, navigation) {
    try {
        const firstRegister = RegisterData.firstRegister;
        /* 가입목적에 따른 Api Body 다르게 요청 */
        const res = await api.post(`user/register/${firstRegister.purpose}`, {
            firstRegister,
            secondRegister: RegisterData.patientInfo,
            lastRegister: RegisterData.patientHelpList
        });
        const { accessToken, ...user } = res.data;
        store.dispatch(saveUser(user));
        await AsyncStorage.setItem('accessToken', accessToken)
        navigation.dispatch(
            StackActions.push('registerCompletePage')
        );
        return;
    }

    catch (err) {
        console.log(err.response)
    }
}