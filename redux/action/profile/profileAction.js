import { createAction } from "@reduxjs/toolkit";

export const saveCareGiverProfile = createAction('profile/saveCareGiverProfile');
export const saveAssistantProfile = createAction('profile/saveAssistantProfile');
export const saveProtectorProfile = createAction('profile/saveProtectorProfile');
export const saveUserProfile = createAction('profile/saveUserProfile');
export const saveLastListNo = createAction('profile/saveLastListNo'); //현재 요청한 프로필의 마지막 번호
export const refreshProfileList = createAction('profile/refreshProfileList'); //새로고침 했을 때 action

// Filter
export const saveMainFilter = createAction('profile/saveMainFilter'); 
export const savePayFilter = createAction('profile/savePayFilter');
export const saveAgeFilter = createAction('profile/saveAgeFilter');
export const saveStartDateFilter = createAction('profile/saveStartDateFilter');
export const saveAreaFilter = createAction('profile/saveAreaFilter');
export const saveLicenseFilter = createAction('profile/saveLicenseFilter');
export const saveWarningFilter = createAction('profile/saveWarningFilter');
export const saveStrengthFilter = createAction('profile/saveStrengthFilter');
export const resetFilter = createAction('profile/resetFilter');
export const savePreviousFilter =createAction('profile/savePreviousFilter');
export const backToPreviousFilter = createAction('profile/backToPreviousFilter');