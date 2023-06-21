import { createAction } from "@reduxjs/toolkit";

//간병인 2번째 회원가입 페이지
export const saveWeight = createAction('secondRegister/saveWeight');
export const saveCareer = createAction('secondRegister/saveCareer');
export const saveFirstPay = createAction('secondRegister/saveFirstPay');
export const saveTime = createAction('secondRegister/saveTime');
export const saveTraining = createAction('secondRegister/saveTraining');
export const saveStartDate = createAction('secondRegister/saveStartDate');
export const saveNextHospital = createAction('secondRegister/saveNextHospital');
export const savePossibleArea = createAction('secondRegister/savePossibleArea');
export const deletePossibleArea = createAction('secondRegister/deletePossibleArea');
export const saveLicense = createAction('secondRegister/saveLicense');
export const deleteLicense = createAction('secondRegister/deleteLicense');
export const secondRegisterReset = createAction('secondRegister/secondRegisterReset');