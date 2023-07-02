import { createAction } from "@reduxjs/toolkit";

export const saveSuction = createAction('patientHelpList/saveSuction'); // 석션 부분
export const saveToilet = createAction('patientHelpList/saveToilet'); // 용변 부분
export const saveBedSore = createAction('patientHelpList/saveBedSore'); // 욕창 부분
export const saveWashing = createAction('patientHelpList/saveWashing'); // 세면 부분
export const saveBathChair = createAction('patientHelpList/saveBathChair'); // 휠체어 부분
export const saveMeal = createAction('patientHelpList/saveMeal'); // 식사 부분
export const helpListReset = createAction('patientHelpList/helpListReset')