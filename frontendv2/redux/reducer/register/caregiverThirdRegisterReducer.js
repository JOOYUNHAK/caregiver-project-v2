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
    helpExperience: {
        suction: undefined,
        toilet: undefined,
        movement: undefined,
        washing: undefined,
    },
    strengthList: {
        first: '',
        second: ''
    },
    tagList: {
        keyWord1: '',
        keyWord2: '',
        keyWord3: '',
    }
};

const caregiverThirdRegisterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveSuction, (state, action) => {
            state.helpExperience.suction = action.payload
        })
        .addCase(saveToilet, (state, action) => {
            state.helpExperience.toilet = action.payload
        })
        .addCase(saveBedSore, (state, action) => {
            state.helpExperience.movement = action.payload
        })
        .addCase(saveWashing, (state, action) => {
            state.helpExperience.washing = action.payload
        })
        .addCase(saveStrength1, (state, action) => {
            state.strengthList.first = action.payload
        })
        .addCase(saveStrength2, (state, action) => {
            state.strengthList.second = action.payload
        })
        .addCase(saveKeyWord1, (state, action) => {
            state.tagList.keyWord1 = action.payload
        })
        .addCase(saveKeyWord2, (state, action) => {
            state.tagList.keyWord2 = action.payload
        })
        .addCase(saveKeyWord3, (state, action) => {
            state.tagList.keyWord3 = action.payload
        })
        .addCase(thirdRegisterReset, (state) => {
            Object.assign(state, initialState )
        })
});

export default caregiverThirdRegisterReducer;