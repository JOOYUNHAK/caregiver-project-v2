import { createReducer } from "@reduxjs/toolkit";
import { backToPreviousFilter, completeHeart, listLoading, refreshProfileList, removeNotFoundProfile, resetFilter, resetHeartList, resetMainFilters, saveAgeFilter, saveAreaFilter, saveCareGiverProfile, saveExceptLicenseFilter, saveHeartListProfile, saveLastListNo, saveLicenseFilter, saveMainFilter, savePayFilter, savePreviousFilter, saveSexFilter, saveStartDateFilter, saveStrengthFilter, saveUserProfile, saveWarningFilter, setNoData, toggleHeart } from "../../action/profile/profileAction";

const initialState = {
    careGiver: [],
    assistant: [],
    protector: [],
    userProfile: {},
    heartProfileList: [],
    lastListNo: 0,

    listLoading: true,
    completeHeart: false,
    noData: false,

    filters: {
        mainFilter: '기본순',
        payFilter: '일당',
        ageFilter: '나이',
        sexFilter: '',
        startDateFilter: '시작가능일',
        areaFilter: [],
        licenseFilter: [],
        warningFilter: false,
        strengthFilter: false,
        exceptLicenseFilter: false
    },

    previousFilter: {
        mainFilter: '기본순',
        payFilter: '일당',
        ageFilter: '나이',
        sexFilter: '',
        startDateFilter: '시작가능일',
        areaFilter: [],
        licenseFilter: [],
        warningFilter: false,
        strengthFilter: false,
        exceptLicenseFilter: false
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
        .addCase(saveHeartListProfile, (state, action) => {
            Object.assign(state.heartProfileList, action.payload);
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
        .addCase(removeNotFoundProfile, (state, action) => {
            state.careGiver = state.careGiver.filter(profile =>
                profile.id != action.payload
            )
        })
        .addCase(completeHeart, (state, action) => {
            state.completeHeart = action.payload;
        })
        .addCase(setNoData, (state, action) => {
            state.noData = action.payload;
        })
        .addCase(toggleHeart, (state, action) => {

            if (!!state.userProfile.heart.isHearted) {
                state.userProfile.heart.isHearted = false;
                state.userProfile.heart.heartCount = parseInt(state.userProfile.heart.heartCount) - 1;
                //찜 목록은 조회할 시 이미 처음 접속때 받았으면 따로 db에 조회하지 않고 목록 업데이트
            }
            else {
                state.userProfile.heart.isHearted = true;
                state.userProfile.heart.heartCount = parseInt(state.userProfile.heart.heartCount) + 1;
            }
            const findHeartProfile = state.heartProfileList.find(
                heartProfile =>
                    heartProfile?.id == action.payload
            );

             if( findHeartProfile === undefined) {
                    const addProfile = state.careGiver
                        .find( careGiverProfile =>  careGiverProfile.id == action.payload);
                    state.heartProfileList.push(addProfile)
                    } 
            else {
                state.heartProfileList = state.heartProfileList.filter( heartProfile =>
                     heartProfile.id != action.payload
                     );
            } 
        })
        .addCase(listLoading, (state, action) => {
            state.listLoading = action.payload;
        })
        .addCase(resetHeartList, (state) => {
            state.heartProfileList = [];
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
        .addCase(saveSexFilter, (state, action) => {
            if (state.filters.sexFilter === action.payload)
                state.filters.sexFilter = '';
            else
                state.filters.sexFilter = action.payload;
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
        .addCase(saveExceptLicenseFilter, (state, action) => {
            state.filters.exceptLicenseFilter = action.payload;
        })
        .addCase(resetFilter, (state) => {
            state.filters.sexFilter = '';
            state.filters.ageFilter = '나이';
            state.filters.areaFilter = [];
            state.filters.licenseFilter = [];
            state.filters.warningFilter = false;
            state.filters.strengthFilter = false;
        })
        .addCase(backToPreviousFilter, (state) => {
            state.filters.sexFilter = state.previousFilter.sexFilter;
            state.filters.ageFilter = state.previousFilter.ageFilter;
            state.filters.areaFilter = state.previousFilter.areaFilter;
            state.filters.licenseFilter = state.previousFilter.licenseFilter;
            state.filters.warningFilter = state.previousFilter.warningFilter;
            state.filters.strengthFilter = state.previousFilter.strengthFilter;
        })
        .addCase(savePreviousFilter, (state) => {
            state.previousFilter.sexFilter = state.filters.sexFilter;
            state.previousFilter.ageFilter = state.filters.ageFilter;
            state.previousFilter.areaFilter = state.filters.areaFilter;
            state.previousFilter.licenseFilter = state.filters.licenseFilter;
            state.previousFilter.warningFilter = state.filters.warningFilter;
            state.previousFilter.strengthFilter = state.filters.strengthFilter;
        })
        .addCase(resetMainFilters, (state) => {
            state.filters.mainFilter = '기본순';
            state.filters.payFilter = '일당';
            state.filters.startDateFilter = '시작가능일';
        })

});

export default profileReducer;