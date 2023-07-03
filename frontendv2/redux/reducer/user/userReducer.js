import { createReducer } from "@reduxjs/toolkit";
import { saveUser, logout } from "../../action/user/userAction";

const initialState = {
    id: '',
};

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveUser, (state, action) => {
            state.id = action.payload
        })
        .addCase(logout, (state) => {
            state.id = '';
        })
});

export default userReducer;