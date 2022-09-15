import { createReducer } from "@reduxjs/toolkit";
import { saveUser, logout, set, saveEmail, toggleProfile } from "../../action/user/userAction";

const initialState = {
    id: '',
    email: '',
    name: '',
    purpose: '',
    isCertified: false,
    profile_off: false,
    token_index: 0,
    warning: 0
};

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveUser, (state, action) => {
            Object.assign(state, action.payload);
        })
        .addCase(saveEmail, (state,action) => {
            state.email = action.payload;
        })
        .addCase(toggleProfile, (state, action) => {
            state.profile_off = action.payload;
        })
        .addCase(logout, (state) => {
            Object.assign(state, initialState);
        })
});

export default userReducer;