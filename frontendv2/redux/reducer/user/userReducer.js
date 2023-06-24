import { createReducer } from "@reduxjs/toolkit";
import { saveUser, logout, set, saveEmail, toggleProfile } from "../../action/user/userAction";

const initialState = {
    id: '',
    phoneNumber: '',
    role: '',
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