import { createReducer } from "@reduxjs/toolkit";
import { saveUser, logout } from "../../action/user/userAction";

const initialState = {
    id: '',
    email: '',
    name: '',
    purpose: '',
    isCertified: false,
    token_index: 0,
    warning: 0
};

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveUser, (state, action) => {
            Object.assign(state, action.payload);
        })
        .addCase(logout, (state) => {
            Object.assign(state, initialState);
        })
});

export default userReducer;