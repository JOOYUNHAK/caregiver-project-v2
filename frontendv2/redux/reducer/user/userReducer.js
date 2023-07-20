import { createReducer } from "@reduxjs/toolkit";
import { saveUser, logout } from "../../action/user/userAction";

const initialState = {
    name: ''
};

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveUser, (state, action) => {
            state.name = action.payload;
        })
        .addCase(logout, (state) => {
            state.name = '';
        })
});

export default userReducer;