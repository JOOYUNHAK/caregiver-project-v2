import { createReducer } from "@reduxjs/toolkit";
import { 
    reset, 
    saveAuthCode, 
    saveBtnText, 
    saveId, 
    saveInfoMessage, 
    saveIsExceed, 
    saveIsNewUser, 
    saveIsSend 
} from "../../action/login/loginAction";

const initialState = {
    btnText: '인증번호 받기',
    isSend: false,
    isExceed: false,
    infoMessage: '',
    authCode: '',
    isNewUser: false
};

const loginReducer = createReducer(initialState, (builder) => {
    builder
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
        .addCase(reset, (state) => {
            Object.assign(state, initialState);
        })
});

export default loginReducer;

