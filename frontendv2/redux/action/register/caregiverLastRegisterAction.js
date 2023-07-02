import { createAction } from "@reduxjs/toolkit";

export const saveExtraFee = createAction('caregiverLastRegister/saveExtraFee'); //추가요금 부분
export const saveNotice = createAction('caregiverLastRegister/saveNotice'); // 한마디 부분
export const lastRegisterReset = createAction('caregiverLastRegister/lastRegisterReset') // 마지막 회원가입 초기화