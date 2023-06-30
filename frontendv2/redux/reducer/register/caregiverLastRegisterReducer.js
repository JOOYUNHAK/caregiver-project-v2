import { createReducer } from "@reduxjs/toolkit";
import {
    lastRegisterReset,
    saveNotice,
    saveExtraFee,
} from "../../action/register/caregiverLastRegisterAction";

const initialState = {
    notice: '',
    additionalChargeCase: ''
};

const caregiverLastRegisterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveNotice, (state, action) => {
            state.notice = action.payload
        })
        .addCase(saveExtraFee, (state, action) => {
            state.additionalChargeCase = action.payload
        })
        .addCase(lastRegisterReset, (state) => {
            Object.assign(state, initialState)
        })
});

export default caregiverLastRegisterReducer;