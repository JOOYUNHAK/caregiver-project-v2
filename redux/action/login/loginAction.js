import { createAction } from "@reduxjs/toolkit";

export const saveId = createAction('login/saveId');
export const saveBtnText = createAction('login/saveBtnText');
export const saveIsSend = createAction('login/saveIsSend');
export const saveIsExceed = createAction('login/saveIsExceed');
export const saveInfoMessage = createAction('login/saveInfoMessage');
export const saveAuthCode = createAction('login/saveAuthCode');
export const saveIsNewUser = createAction('login/saveIsNewUser');
export const reset = createAction('login/reset');
