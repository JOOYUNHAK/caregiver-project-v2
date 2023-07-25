import { createReducer } from "@reduxjs/toolkit";
import { saveUser, logout, saveProfile } from "../../action/user/userAction";

const initialState = {
    name: '',
    profile: {
        phoneNumber: '',
        email: '',
        role: '',
        isPrivate: undefined,
    }
};

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveUser, (state, action) => {
            state.name = action.payload;
        })
        .addCase(saveProfile, (state, action) => {
            state.profile.email = action.payload.email;
            state.profile.phoneNumber = action.payload.phoneNumber;
            state.profile.role = 
                action.payload.role === 'caregiver' ? '간병인' : '보호자';
            state.profile.isPrivate = 
                !!action.payload.isPrivate ? action.payload.isPrivate : undefined;
        })
        .addCase(logout, (state) => {
            Object.assign(state, initialState)
        })
});

export default userReducer;