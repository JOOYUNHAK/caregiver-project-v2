import { createAction } from "@reduxjs/toolkit";

export const saveSuction = createAction('caregiverThirdRegister/saveSuction'); // 석션 부분
export const saveToilet = createAction('caregiverThirdRegister/saveToilet'); // 용변 부분
export const saveBedSore = createAction('caregiverThirdRegister/saveBedSore'); // 욕창 부분
export const saveWashing = createAction('caregiverThirdRegister/saveWashing'); // 세면 부분
export const saveStrength1 = createAction('caregiverThirdRegister/saveStrength1'); //  강점 부분
export const saveStrength2 = createAction('caregiverThirdRegister/saveStrength2'); //  강점 부분
export const saveKeyWord1 = createAction('caregiverThirdRegister/saveKeyWord1'); // 키워드 부분
export const saveKeyWord2 = createAction('caregiverThirdRegister/saveKeyWord2'); // 키워드 부분
export const saveKeyWord3 = createAction('caregiverThirdRegister/saveKeyWord3'); // 키워드 부분
export const thirdRegisterReset = createAction('caregiverThirdRegister/thirdRegisterReset') // 세번째 회원가입 리셋
