
import { createReducer } from "@reduxjs/toolkit";
import {
    saveId,
    saveName,
    saveBirth,
    saveSex,
    savePurpose,
    saveIsAuthed,
    saveIsFill,
    firstRegisterReset
} from "../../action/register/firstRegisterAction";

const initialState = {
    user: {
        id: '',
        name: '',
        birth: '',
        sex: '',
        purpose: ''
    },
    isAuthed: false
}

const firstRegisterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveId, (state, action) => {
            state.user.id = action.payload
        })
        .addCase(saveName, (state, action) => {
            state.user.name = action.payload
        })
        .addCase(saveBirth, (state, action) => {
            state.user.birth = action.payload
        })
        .addCase(saveSex, (state, action) => {
            state.user.sex = action.payload
        })
        .addCase(savePurpose, (state, action) => {
            state.user.purpose = action.payload
        })
        .addCase(saveIsAuthed, (state, action) => {
            state.isAuthed = action.payload
        })
        .addCase(saveIsFill, (state, action) => {
            state.isFill = action.payload
        })
        .addCase(firstRegisterReset, (state) => {
            Object.assign(state, initialState)
        })
})

export default firstRegisterReducer;