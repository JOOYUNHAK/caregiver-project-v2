import { createReducer } from "@reduxjs/toolkit";
import { 
    helpListReset,
    saveBathChair, 
    saveBedSore, 
    saveMeal, 
    saveSuction, 
    saveToilet, 
    saveWashing 
} from "../../action/register/patientHelpListAction";

const initialState = {
    suction: undefined,
    toilet: undefined,
    bedsore: undefined,
    washing: undefined,
    meal: undefined,
    bathChair: undefined
};

const patientHelpListReducer = createReducer(initialState, (builder) => {
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
            state.meal = action.payload
        })
        .addCase(saveBathChair, (state, action) => {
            state.bathChair = action.payload
        })
        .addCase(helpListReset, (state) => {
            Object.assign(state, initialState)
        })
});

export default patientHelpListReducer;