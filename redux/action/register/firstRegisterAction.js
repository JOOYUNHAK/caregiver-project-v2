import { createAction } from "@reduxjs/toolkit";

export const saveId = createAction('register/saveId');
export const saveName = createAction('register/saveName');
export const saveBirth = createAction('register/saveBirth');
export const saveSex = createAction('register/saveSex');
export const savePurpose = createAction('register/savePurpose');
export const saveIsAuthed = createAction('register/saveIsAuthed');
export const saveIsFill = createAction('register/saveIsFill');
export const firstRegisterReset = createAction('register/firstRegisterReset');


