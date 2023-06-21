import { createReducer } from "@reduxjs/toolkit";
import { 
    saveBathChair, 
    saveBedSore, 
    saveMeal, 
    saveSuction, 
    saveToilet, 
    saveWashing 
} from "../../action/register/patientHelpListAction";

const initialState = {
    suction: '',
    toilet: '',
    bedsore: '',
    washing: '',
    meal: '',
    bathChair: ''
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
});

export default patientHelpListReducer;