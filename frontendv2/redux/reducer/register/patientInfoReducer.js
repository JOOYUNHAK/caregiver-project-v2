import { createReducer } from "@reduxjs/toolkit";
import { 
    patientInfoReset,
    saveDiagnosis,
    saveEndPeriod, 
    saveIsNext, 
    savePatientSex,
    savePatientState, 
    savePlace, 
    saveStartPeriod, 
    saveTotalPeriod, 
    saveWeight 
} from "../../action/register/patientInfoAction";

const initialState = {
    weight: 0,
    patientSex: '',
    diagnosis: '',
    startPeriod: '',
    endPeriod: '',
    totalPeriod: 0,
    place: '',
    isNext: '',
    patientState: ''
};

const patientInfoReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveWeight, (state, action) => { // 3명 공통 입력칸인 몸무게 저장
            state.weight = Number(action.payload)
        })
        .addCase(savePatientSex, (state, action) => { // 보호자용 환자의 성별 저장
            state.patientSex = action.payload
        })
        .addCase(saveDiagnosis, (state, action) => { //보호자용 환자가 받은 진단명 저장
            state.diagnosis = action.payload
        })
        .addCase(saveStartPeriod, (state, action) => {
            state.startPeriod = new Date(action.payload);
        })
        .addCase(saveEndPeriod, (state, action) => {
            state.endPeriod = new Date(action.payload);
        })
        .addCase(saveTotalPeriod, (state, action) => {
            state.totalPeriod = Number(action.payload);
        })
        .addCase(savePlace, (state, action) => { // 보호자용 환자 케어 장소 저장
            state.place = action.payload
        })
        .addCase(saveIsNext, (state, action) => { // 보호자용 환자가 다음 병원 예정되어있는지 저장
            state.isNext = 
                action.payload === '예정' ? true : false;
        })
        .addCase(savePatientState, (state, action) => { // 보호자용 환자 현재 상태 저장
            state.patientState = action.payload
        })
        .addCase(patientInfoReset, (state) => { // 두번째 회원가입 페이지 초기화
            Object.assign(state, initialState)
        })
});

export default patientInfoReducer;