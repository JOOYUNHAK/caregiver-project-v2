import { createReducer } from "@reduxjs/toolkit";
import { patientProfileVisible, saveChatProtectorId, savePatientProfile, saveSocketId } from "../../action/chat/chatAction";

const initialState = {
    protectorId: '',
    visible: false,
    patientProfile: {
        weight: '',
        sex: '',
        diagnosis: '',
        start: '',
        end: '',
        place: '',
        next: '',
        state: '',
        suction: '',
        toilet: '',
        bedSore: '',
        washing: '',
        meal: '',
        bathChair: ''
    },

    socketId: ''
};

const chatReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveChatProtectorId, (state, action) => {
            state.protectorId = action.payload;
        })
        .addCase(patientProfileVisible, (state,action) => {
            state.visible = action.payload
        })
        .addCase(savePatientProfile, (state, action) => {
            Object.assign(state.patientProfile, action.payload)
        })
        .addCase(saveSocketId, (state, action) => {
            state.socketId = action.payload;
        })

})

export default chatReducer;