import { createReducer } from "@reduxjs/toolkit";
import { saveUser, logout } from "../../action/user/userAction";

const initialState = {
    id: '',
    name: ''
};

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveUser, (state, action) => {
            Object.assign(state, action.payload)
        })
        .addCase(logout, (state) => {
            state.id = '';
            state.name = '';
        })
});

export default userReducer;