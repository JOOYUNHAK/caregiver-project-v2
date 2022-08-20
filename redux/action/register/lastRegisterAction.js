import { createAction } from "@reduxjs/toolkit";

//보호자, 간병인 공통 질문
export const saveSuction = createAction('lastRegister/saveSuction'); // 석션 부분
export const saveToilet = createAction('lastRegister/saveToilet'); // 용변 부분
export const saveBedSore = createAction('lastRegister/saveBedSore'); // 욕창 부분
export const saveWashing = createAction('lastRegister/saveWashing'); // 세면 부분
export const saveStrength1 = createAction('lastRegister/saveStrength1'); //  강점 부분
export const saveStrength2 = createAction('lastRegister/saveStrength2'); //  강점 부분

//간병인 전용 질문
export const saveKeyWord1 = createAction('lastRegister/saveKeyWord1'); // 키워드 부분
export const saveKeyWord2 = createAction('lastRegister/saveKeyWord2'); // 키워드 부분
export const saveKeyWord3 = createAction('lastRegister/saveKeyWord3'); // 키워드 부분

//보호자용 전용 질문
export const saveBathChair = createAction('lastRegister/saveBathChair'); // 휠체어 부분
export const saveMeal = createAction('lastRegister/saveMeal'); // 식사 부분

//활동보조사 전용 질문
export const saveWithPatient = createAction('lastRegister/saveWithPatient'); // 환자와의 시간 부분

export const lastRegisterReset = createAction('lastRegister/lastRegisterReset'); //마지막 페이지 리셋 

