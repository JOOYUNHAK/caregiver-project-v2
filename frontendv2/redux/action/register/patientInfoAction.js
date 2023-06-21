import { createAction } from "@reduxjs/toolkit";

export const saveWeight = createAction('patientInfo/saveWeight'); // 환자 몸무게
export const savePatientSex = createAction('patientInfo/savePatientSex'); // 환자 성별
export const saveDiagnosis = createAction('patientInfo/saveDiagnosis'); // 환자 진단명
export const saveStartPeriod = createAction('patientInfo/saveStartPeriod'); // 환자 케어 시작 날짜
export const saveEndPeriod = createAction('patientInfo/saveEndPeriod'); // 환자 케어 마치는 날짜
export const saveTotalPeriod = createAction('patientInfo/saveTotalPeriod'); // 환자 케어 총 일수
export const savePlace = createAction('patientInfo/savePlace'); // 환자 케어하게 될 장소
export const saveIsNext = createAction('patientInfo/saveIsNext'); // 환자 다음병원 예정 여부
export const savePatientState = createAction('patientInfo/savePatientState'); // 환자 자세한 몸상태
export const patientInfoReset = createAction('patientInfo/patientInfoReset'); // 환자 정보 작성 초기화