/* 회원가입 유저 생성 요청 보내기 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import api from "../../config/CustomAxios";
import { saveUser } from "../../redux/action/user/userAction";
import store from "../../redux/store";

export default async function requestCreateUser(RegisterData, navigation) {
    try {
        const firstRegister = RegisterData.firstRegister;
        const { purpose } = firstRegister
        /* 가입목적에 따른 Api Body 다르게 요청 */
        const res = await api.post(`user/register/${purpose}`, {
            firstRegister,
            secondRegister: purpose === 'protector' ? RegisterData.patientInfo : RegisterData.caregiverInfo,
            thirdRegister: purpose === 'protector' ? undefined : convertCaregiverThirdRegister(RegisterData.caregiverThirdRegister),
            lastRegister: purpose === 'protector' ? returnObjectOrUndefined(RegisterData.patientHelpList) : RegisterData.caregiverLastRegister,

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

/* 간병인 세번째 회원가입양식 api에 맞춰 변경 */
function convertCaregiverThirdRegister(thirdRegisterData) {
    const { experience, strengths, tags } = thirdRegisterData;

    return { 
        experience: returnObjectOrUndefined(experience),
        strengths: returnArrayOrUndefined(Object.values(strengths)),
        tags: returnArrayOrUndefined(Object.values(tags))
    };
};

function returnArrayOrUndefined(inputArray) {
    return inputArray.length ? inputArray : undefined; 
};

function returnObjectOrUndefined(inputObject) {
    return Object.values(inputObject).length ? inputObject : undefined;
}