import { createReducer } from '@reduxjs/toolkit';
import {
    saveWeight,
    saveCareer,
    saveFirstPay,
    saveStartDate,
    saveNextHospital,
    savePossibleArea,
    deletePossibleArea,
    saveLicense,
    deleteLicense,
    secondRegisterReset,
    saveTime,
    saveTraining,
    savePatientSex,
    saveDiagnosis,
    savePlace,
    saveIsNext,
    savePatientState,
    savePeriod
} from '../../action/register/secondRegisterAction';

const initialState = {
    weight: '',
    career: '',
    startDate: '',
    possibleArea: [],
    license: [],
    careGiver: {
        firstPay: '',
        nextHospital: ''
    },
    assistant: {
        time: '',
        training: ''
    },
    protector: {
        patientSex: '',
        diagnosis: '',
        period: '',
        place: '',
        isNext: '',
        patientState: ''
    }
}

const secondRegisterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveWeight, (state, action) => { // 3명 공통 입력칸인 몸무게 저장
            state.weight = action.payload
        })
        .addCase(saveCareer, (state, action) => { // 간병인, 활동보조사 경력 저장
            state.career = action.payload
        })
        .addCase(saveFirstPay, (state, action) => { // 간병인 페이 시작 저장
            state.careGiver.firstPay = action.payload
        })
        .addCase(saveTime, (state, action) => {  // 활동보조사 활동 가능 시간 저장
            state.assistant.time = action.payload
        })
        .addCase(saveTraining, (state, action) => { //활동보조사 실습 여부 저장
            state.assistant.training = action.payload
        })
        .addCase(saveStartDate, (state, action) => { // 간병인, 활동보조사 시작 가능 시점 저장
            state.startDate = action.payload
        })
        .addCase(saveNextHospital, (state, action) => { // 간병인 다음 병원에 대한 대처 저장
            state.careGiver.nextHospital = action.payload
        })
        .addCase(savePossibleArea, (state, action) => { // 간병인, 활동보조사 가능 지역 저장
            state.possibleArea.push(action.payload)
        })
        .addCase(deletePossibleArea, (state, action) => { // 간병인, 활동보조사 가능 지역 삭제
            state.possibleArea.pop(action.payload)
        })
        .addCase(saveLicense, (state, action) => { // 간병인, 활동보조사 자격증 저장
            state.license.push(action.payload)
        })
        .addCase(deleteLicense, (state, action) => { //간병인, 활동보조사 자격증 삭제
            state.license.pop(action.payload)
        })
        .addCase(secondRegisterReset, (state) => { // 두번째 회원가입 페이지 초기화
            Object.assign(state, initialState)
        })
        .addCase(savePatientSex, (state, action) => { // 보호자용 환자의 성별 저장
            state.protector.patientSex = action.payload
        })
        .addCase(saveDiagnosis, (state, action) => { //보호자용 환자가 받은 진단명 저장
            state.protector.diagnosis = action.payload
        })
        .addCase(savePeriod, (state, action) => {
            state.protector.period = action.payload
        })
        .addCase(savePlace, (state, action) => { // 보호자용 환자 케어 장소 저장
            state.protector.place = action.payload
        })
        .addCase(saveIsNext, (state, action) => { // 보호자용 환자가 다음 병원 예정되어있는지 저장
            state.protector.isNext = action.payload
        })
        .addCase(savePatientState, (state, action) => { // 보호자용 환자 현재 상태 저장
            state.protector.patientState = action.payload
        })
})

export default secondRegisterReducer;