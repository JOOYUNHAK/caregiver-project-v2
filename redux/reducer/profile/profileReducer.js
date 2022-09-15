import { createReducer } from "@reduxjs/toolkit";
import { saveCareGiverProfile, saveUserProfile } from "../../action/profile/profileAction";

const initialState = {
    careGiver: [],
    assistant: [],
    protector: [],
    userProfile: {}
};

const profileReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveCareGiverProfile, (state, action) => {
            state.careGiver = [];
            const profileList = action.payload;
            profileList.map((profile) => {
                state.careGiver.push(profile);
            }) 
        })
        .addCase(saveUserProfile, (state, action) => {
            Object.assign(state.userProfile, action.payload)
        })
});

export default profileReducer;