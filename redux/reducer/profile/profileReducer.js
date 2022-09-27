import { createReducer } from "@reduxjs/toolkit";
import { backToPreviousFilter, refreshProfileList, resetFilter, saveAgeFilter, saveAreaFilter, saveCareGiverProfile, saveLastListNo, saveLicenseFilter, saveMainFilter, savePayFilter, savePreviousFilter, saveStartDateFilter, saveStrengthFilter, saveUserProfile, saveWarningFilter } from "../../action/profile/profileAction";

const initialState = {
    careGiver: [],
    assistant: [],
    protector: [],
    userProfile: {},
    lastListNo: 0,

    filters: {
        mainFilter: '기본순',
        payFilter: '일당',
        ageFilter: '나이',
        startDateFilter: '시작가능일',
        areaFilter: [],
        licenseFilter: [],
        warningFilter: false,
        strengthFilter: false
    },

    previousFilter: {
        mainFilter: '기본순',
        payFilter: '일당',
        ageFilter: '나이',
        startDateFilter: '시작가능일',
        areaFilter: [],
        licenseFilter: [],
        warningFilter: false,
        strengthFilter: false
    },

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
            if (action.payload === 'careGiver')
                state.careGiver = [];
            else
                state.assistant = [];
        })
        .addCase(saveMainFilter, (state, action) => {
            state.filters.mainFilter = action.payload
        })
        .addCase(savePayFilter, (state, action) => {
            if (action.payload === '전체금액')
                state.filters.payFilter = '일당';
            else
                state.filters.payFilter = action.payload
        })
        .addCase(saveAgeFilter, (state, action) => {
            if (state.filters.ageFilter === action.payload)
                state.filters.ageFilter = '나이';
            else
                state.filters.ageFilter = action.payload
        })
        .addCase(saveStartDateFilter, (state, action) => {
            if (action.payload === '전체날짜')
                state.filters.startDateFilter = '시작가능일';
            else
                state.filters.startDateFilter = action.payload;
        })
        .addCase(saveAreaFilter, (state, action) => {
            if (state.filters.areaFilter.includes(action.payload))
                state.filters.areaFilter = state.filters.areaFilter.filter((area) => {
                    return area !== action.payload;
                })
            else {
                if (state.filters.areaFilter.length <= 2)
                    state.filters.areaFilter.push(action.payload);
                else {
                    state.filters.areaFilter.shift();
                    state.filters.areaFilter.push(action.payload);
                }
            }
        })
        .addCase(saveLicenseFilter, (state, action) => {
            if (state.filters.licenseFilter.includes(action.payload))
                state.filters.licenseFilter = state.filters.licenseFilter.filter((license) => {
                    return license !== action.payload;
                })
            else {
                if (state.filters.licenseFilter.length <= 2)
                    state.filters.licenseFilter.push(action.payload);
                else {
                    state.filters.licenseFilter.shift();
                    state.filters.licenseFilter.push(action.payload);
                }
            }
        })
        .addCase(saveWarningFilter, (state, action) => {
            state.filters.warningFilter = action.payload;
        })
        .addCase(saveStrengthFilter, (state, action) => {
            state.filters.strengthFilter = action.payload;
        })
        .addCase(resetFilter, (state) => {
            Object.assign(state.filters, initialState.filters);
        })
        .addCase(backToPreviousFilter, (state) => {
            Object.assign(state.filters, state.previousFilter);
        })
        .addCase(savePreviousFilter, (state) => {
            Object.assign(state.previousFilter, state.filters);
        })

});

export default profileReducer;