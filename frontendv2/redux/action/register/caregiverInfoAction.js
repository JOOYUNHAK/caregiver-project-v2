import { createAction } from "@reduxjs/toolkit";

//간병인 2번째 회원가입 페이지
export const saveWeight = createAction('caregiverInfo/saveWeight');
export const saveCareer = createAction('caregiverInfo/saveCareer');
export const saveFirstPay = createAction('caregiverInfo/saveFirstPay');
export const saveStartDate = createAction('caregiverInfo/saveStartDate');
export const saveNextHospital = createAction('caregiverInfo/saveNextHospital');
export const savePossibleArea = createAction('caregiverInfo/savePossibleArea');
export const deletePossibleArea = createAction('caregiverInfo/deletePossibleArea');
export const saveLicense = createAction('caregiverInfo/saveLicense');
export const deleteLicense = createAction('caregiverInfo/deleteLicense');
export const caregiverInfoReset = createAction('caregiverInfo/caregiverInfoReset');