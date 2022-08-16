import { createReducer } from '@reduxjs/toolkit';
import {
    saveWeight,
    saveCareer,
    saveFirstPay,
    saveSecondPay,
    saveStartDate,
    saveNextHospital,
    savePossibleArea,
    deletePossibleArea,
    saveLicense,
    deleteLicense,
    secondRegisterReset
} from '../../action/register/secondRegisterAction';

const initialState = {
    weight: '',
    career: '',
    startDate: '',
    possibleArea: [],
    license: [],
    careGiver: {
        firstPay: '',
        secondPay: '',
        nextHospital: ''
    }
}

const secondRegisterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveWeight, (state, action) => {
            state.weight = action.payload
        })
        .addCase(saveCareer, (state, action) => {
            state.career = action.payload
        })
        .addCase(saveFirstPay, (state, action) => {
            state.careGiver.firstPay = action.payload
        })
        .addCase(saveSecondPay, (state, action) => {
            state.careGiver.secondPay = action.payload
        })
        .addCase(saveStartDate, (state, action) => {
            state.startDate = action.payload
        })
        .addCase(saveNextHospital, (state, action) => {
            state.careGiver.nextHospital = action.payload
        })
        .addCase(savePossibleArea, (state, action) => {
            state.possibleArea.push(action.payload)
        })
        .addCase(deletePossibleArea, (state, action) => {
            state.possibleArea.pop(action.payload)
        })
        .addCase(saveLicense, (state, action) => {
            state.license.push(action.payload)
        })
        .addCase(deleteLicense, (state, action) => {
            state.license.pop(action.payload)
        })
        .addCase(secondRegisterReset, (state) => {
            Object.assign(state, initialState)
        })
})

export default secondRegisterReducer;