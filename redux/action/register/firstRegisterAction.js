import { createAction } from "@reduxjs/toolkit";

export const saveId = createAction('firstRegister/saveId');
export const saveName = createAction('firstRegister/saveName');
export const saveBirth = createAction('firstRegister/saveBirth');
export const saveSex = createAction('firstRegister/saveSex');
export const savePurpose = createAction('firstRegister/savePurpose');
export const saveIsAuthed = createAction('firstRegister/saveIsAuthed');
export const saveIsFill = createAction('firstRegister/saveIsFill');
export const firstRegisterReset = createAction('firstRegister/firstRegisterReset');


