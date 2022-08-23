import { createReducer } from "@reduxjs/toolkit";
import { 
    confirmRegisterInfoReset,
    lastRegisterReset,
    saveBathChair, 
    saveBedSore, 
    saveKeyWord1, 
    saveKeyWord2, 
    saveKeyWord3, 
    saveMeal, 
    saveNotice, 
    saveStrength1, 
    saveStrength2, 
    saveSuction, 
    saveToilet, 
    saveWashing, 
    saveWithPatient } from "../../action/register/lastRegisterAction";

const initialState = {
    suction: '',
    toilet: '',
    bedsore: '',
    washing: '',
    strength: {
        first: '',
        second: ''
    },
    careGiver: {
        keyWord1: '',
        keyWord2: '',
        keyWord3: '',
        notice: ''
    },
    assistant: {
        withPatient: ''
    },
    protector: {
        meal: '',
        bathChair: '',
    },
};

const lastRegisterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveSuction, (state, action) => {
            state.suction = action.payload
        })
        .addCase(saveToilet, (state, action) => {
            state.toilet = action.payload
        })
        .addCase(saveBedSore, (state, action) => {
            state.bedsore = action.payload
        })
        .addCase(saveWashing, (state, action) => {
            state.washing = action.payload
        })
        .addCase(saveMeal, (state, action) => {
            state.protector.meal = action.payload
        })
        .addCase(saveBathChair, (state, action) => {
            state.protector.bathChair = action.payload
        })
        .addCase(saveStrength1, (state, action) => {
            state.strength.first = action.payload
        })
        .addCase(saveStrength2, (state, action) => {
            state.strength.second = action.payload
        })
        .addCase(saveWithPatient, (state, action) => {
            state.assistant.withPatient = action.payload
        })
        .addCase(saveKeyWord1, (state, action) => {
            state.careGiver.keyWord1 = action.payload
        })
        .addCase(saveKeyWord2, (state, action) => {
            state.careGiver.keyWord2 = action.payload
        })
        .addCase(saveKeyWord3, (state, action) => {
            state.careGiver.keyWord3 = action.payload
        })
        .addCase(lastRegisterReset, (state) => {
            Object.assign(state, initialState )
        })
        .addCase(saveNotice, (state, action) => {
            state.careGiver.notice = action.payload
        })
        .addCase(confirmRegisterInfoReset, (state) => {
            state.careGiver.notice = '';
        })
});

export default lastRegisterReducer;