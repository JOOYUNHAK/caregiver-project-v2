import { createReducer } from "@reduxjs/toolkit";
import {
    saveBedSore,
    saveKeyWord1,
    saveKeyWord2,
    saveKeyWord3,
    saveStrength1,
    saveStrength2,
    saveSuction,
    saveToilet,
    saveWashing,
    thirdRegisterReset
} from "../../action/register/caregiverThirdRegisterAction";

const initialState = {
    experience: {
        suction: undefined,
        toilet: undefined,
        bedsore: undefined,
        washing: undefined,
    },
    strengths: {
        first: '',
        second: ''
    },
    tags: {
        keyWord1: '',
        keyWord2: '',
        keyWord3: '',
    }
};

const caregiverThirdRegisterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveSuction, (state, action) => {
            state.experience.suction = action.payload
        })
        .addCase(saveToilet, (state, action) => {
            state.experience.toilet = action.payload
        })
        .addCase(saveBedSore, (state, action) => {
            state.experience.bedsore = action.payload
        })
        .addCase(saveWashing, (state, action) => {
            state.experience.washing = action.payload
        })
        .addCase(saveStrength1, (state, action) => {
            state.strengths.first = action.payload
        })
        .addCase(saveStrength2, (state, action) => {
            state.strengths.second = action.payload
        })
        .addCase(saveKeyWord1, (state, action) => {
            state.tags.keyWord1 = action.payload
        })
        .addCase(saveKeyWord2, (state, action) => {
            state.tags.keyWord2 = action.payload
        })
        .addCase(saveKeyWord3, (state, action) => {
            state.tags.keyWord3 = action.payload
        })
        .addCase(thirdRegisterReset, (state) => {
            Object.assign(state, initialState )
        })
});

export default caregiverThirdRegisterReducer;