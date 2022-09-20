import { createAction } from "@reduxjs/toolkit";

export const saveCareGiverProfile = createAction('profile/saveCareGiverProfile');
export const saveAssistantProfile = createAction('profile/saveAssistantProfile');
export const saveProtectorProfile = createAction('profile/saveProtectorProfile');
export const saveUserProfile = createAction('profile/saveUserProfile');
export const saveLastListNo = createAction('profile/saveLastListNo'); //현재 요청한 프로필의 마지막 번호
export const refreshProfileList = createAction('profile/refreshProfileList');