import { createReducer } from "@reduxjs/toolkit";
import { refreshProfileList, saveCareGiverProfile, saveLastListNo, saveUserProfile } from "../../action/profile/profileAction";

const initialState = {
    careGiver: [],
    assistant: [],
    protector: [],
    userProfile: {},
    lastListNo: 0
};

const profileReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveCareGiverProfile, (state, action) => {
            const profileList = action.payload;
            profileList.map((profile) => {
                state.careGiver.push(profile);
            }) 
        })
        .addCase(saveUserProfile, (state, action) => {
            Object.assign(state.userProfile, action.payload)
        })
        .addCase(saveLastListNo, (state, action) => {
            state.lastListNo = action.payload
        })
        .addCase(refreshProfileList, (state, action) => {
            state.lastListNo = 0;
            if(action.payload === 'careGiver')
                state.careGiver = [];
            else
                state.assistant = [];
        })
});

export default profileReducer;