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
    caregiverInfoReset,
} from '../../action/register/caregiverInfoAction';

const initialState = {
    weight:'',
    career: '',
    pay: '',
    possibleDate: '',
    nextHospital: '',
    possibleAreaList: [],
    licenseList: [],
}

const caregiverInfoReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveWeight, (state, action) => { // 공통 입력칸인 몸무게 저장
            state.weight = Number(action.payload)
        })
        .addCase(saveCareer, (state, action) => { // 간병인 경력
            state.career = Number(action.payload)
        })
        .addCase(saveFirstPay, (state, action) => { // 간병인 페이 시작 저장
            state.pay = Number(action.payload)
        })
        .addCase(saveStartDate, (state, action) => { // 간병인 시작 가능일
            state.possibleDate = action.payload
        })
        .addCase(saveNextHospital, (state, action) => { // 간병인 다음 병원에 대한 대처 저장
            state.nextHospital = action.payload
        })
        .addCase(savePossibleArea, (state, action) => { // 간병인 가능 지역 저장
            state.possibleAreaList.push(action.payload)
        })
        .addCase(deletePossibleArea, (state, action) => { // 간병인 가능 지역 삭제
            state.possibleAreaList.pop(action.payload)
        })
        .addCase(saveLicense, (state, action) => { // 간병인 자격증 저장
            state.licenseList.push(action.payload)
        })
        .addCase(deleteLicense, (state, action) => { //간병인, 활동보조사 자격증 삭제
            state.licenseList.pop(action.payload)
        })
        .addCase(caregiverInfoReset, (state) => { // 두번째 회원가입 페이지 초기화
            Object.assign(state, initialState)
        })
})

export default caregiverInfoReducer;