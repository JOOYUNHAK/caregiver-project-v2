import { createReducer } from "@reduxjs/toolkit"
import { backToPreviousSearchFilter, refreshSearchProfileList, resetPreviousSearchFilters, resetSearchFilter, resetSearchMainFilters, saveAutoStore, saveIsBlocked, savePreviousSearchFilter, saveRecentSearchKeywords, saveResultProfile, saveSearchAgeFilter, saveSearchAreaFilter, saveSearchLastListNo, saveSearchLicenseFilter, saveSearchMainFilter, saveSearchPayFilter, saveSearchSexFilter, saveSearchStartDateFilter, saveSearchStrengthFilter, saveSearchValue, saveSearchWarningFilter, searchLoading, setSearchNoData } from "../../action/search/searchAction"

const initialState = {
    searchValue: '',
    isBlocked: false,
    autoStore: true,
    recentSearchKeywords: null,

    searchLastListNo: 0,
    searchLoading: false,

    resultProfile: [],
    resultCount: 0,
    searchNoData: false,

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
}

const searchReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(saveSearchValue, (state, action) => {
            state.searchValue = action.payload;
        })
        .addCase(saveIsBlocked, (state, action) => {
            state.isBlocked = action.payload;
        })
        .addCase(saveAutoStore, (state, action) => {
            state.autoStore = action.payload;
        })
        .addCase(setSearchNoData, (state, action) => {
            state.searchNoData = action.payload;
        })
        .addCase(saveRecentSearchKeywords, (state, action) => {
            state.recentSearchKeywords = action.payload;
        })
        .addCase(saveResultProfile, (state, action) => {

            const _resultProfileList = action.payload[0];
            _resultProfileList.map((profile) => {
                state.resultProfile.push(profile);
            })
            
            if( !!action.payload[1].count )
                state.resultCount = action.payload[1].count;
        })
        .addCase(saveSearchLastListNo, (state, action) => {
            state.searchLastListNo = action.payload;
        })
        .addCase(refreshSearchProfileList, (state) => {
            state.searchLastListNo = 0;
            state.resultProfile = [];
        })
        .addCase(searchLoading, (state, action) => {
            state.searchLoading = action.payload;
        })
        .addCase(saveSearchMainFilter, (state, action) => {
            state.filters.mainFilter = action.payload
        })
        .addCase(saveSearchPayFilter, (state, action) => {
            if (action.payload === '전체금액')
                state.filters.payFilter = '일당';
            else
                state.filters.payFilter = action.payload
        })
        .addCase(saveSearchAgeFilter, (state, action) => {
            if (state.filters.ageFilter === action.payload)
                state.filters.ageFilter = '나이';
            else
                state.filters.ageFilter = action.payload
        })
        .addCase(saveSearchSexFilter, (state, action) => {
            if (state.filters.sexFilter === action.payload)
                state.filters.sexFilter = '';
            else
                state.filters.sexFilter = action.payload;
        })
        .addCase(saveSearchStartDateFilter, (state, action) => {
            if (action.payload === '전체날짜')
                state.filters.startDateFilter = '시작가능일';
            else
                state.filters.startDateFilter = action.payload;
        })
        .addCase(saveSearchAreaFilter, (state, action) => {
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
        .addCase(saveSearchLicenseFilter, (state, action) => {
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
        .addCase(saveSearchWarningFilter, (state, action) => {
            state.filters.warningFilter = action.payload;
        })
        .addCase(saveSearchStrengthFilter, (state, action) => {
            state.filters.strengthFilter = action.payload;
        })
        .addCase(resetSearchFilter, (state) => {
            state.filters.sexFilter = '';
            state.filters.ageFilter = '나이';
            state.filters.areaFilter = [];
            state.filters.licenseFilter = [];
            state.filters.warningFilter = false;
            state.filters.strengthFilter = false;
        })
        .addCase(resetPreviousSearchFilters, (state) => {
            state.previousFilter.sexFilter = '';
            state.previousFilter.ageFilter = '나이';
            state.previousFilter.areaFilter = [];
            state.previousFilter.licenseFilter = [];
            state.previousFilter.warningFilter = false;
            state.previousFilter.strengthFilter = false;
        })
        .addCase(backToPreviousSearchFilter, (state) => {
            state.filters.sexFilter = state.previousFilter.sexFilter;
            state.filters.ageFilter = state.previousFilter.ageFilter;
            state.filters.areaFilter = state.previousFilter.areaFilter;
            state.filters.licenseFilter = state.previousFilter.licenseFilter;
            state.filters.warningFilter = state.previousFilter.warningFilter;
            state.filters.strengthFilter = state.previousFilter.strengthFilter;
        })
        .addCase(savePreviousSearchFilter, (state) => {
            state.previousFilter.sexFilter = state.filters.sexFilter;
            state.previousFilter.ageFilter = state.filters.ageFilter;
            state.previousFilter.areaFilter = state.filters.areaFilter;
            state.previousFilter.licenseFilter = state.filters.licenseFilter;
            state.previousFilter.warningFilter = state.filters.warningFilter;
            state.previousFilter.strengthFilter = state.filters.strengthFilter;
        })
        .addCase(resetSearchMainFilters, (state) => {
            state.filters.mainFilter = '기본순';
            state.filters.payFilter = '일당';
            state.filters.startDateFilter = '시작가능일';
        })
})

export default searchReducer;