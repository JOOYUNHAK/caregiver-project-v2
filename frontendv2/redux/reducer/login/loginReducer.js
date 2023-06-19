import { createReducer } from "@reduxjs/toolkit";
import { 
    reset, 
    saveAuthCode, 
    saveBtnText, 
    saveId, 
    saveInfoMessage, 
    saveIsAuthed, 
    saveIsExceed, 
    saveIsNewUser, 
    saveIsSend 
} from "../../action/login/loginAction";

const initialState = {
    id: '',
    btnText: '인증번호 받기',
    isSend: false,
    isExceed: false,
    infoMessage: '',
    authCode: '',
    isNewUser: false,
    isAuthed: false
};

const loginReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveId, (state, action) => {
            state.id = action.payload
        })
        .addCase(saveBtnText, (state, action) => {
            state.btnText = action.payload;
        })
        .addCase(saveIsSend, (state, action) => {
            state.isSend = action.payload;
        })
        .addCase(saveIsExceed, (state, action) => {
            state.isExceed = action.payload;
        })
        .addCase(saveInfoMessage, (state, action) => {
            state.infoMessage = action.payload;
        })
        .addCase(saveAuthCode, (state, action) => {
            state.authCode = action.payload;
        })
        .addCase(saveIsNewUser, (state, action) => {
            state.isNewUser = action.payload;
        })
        .addCase(saveIsAuthed, (state, action) => {
            state.isAuthed = action.payload
        })
        .addCase(reset, (state) => {
            Object.assign(state, initialState);
        })
});

export default loginReducer;

