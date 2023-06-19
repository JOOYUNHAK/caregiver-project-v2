import { createAction } from "@reduxjs/toolkit";

export const saveSearchValue = createAction('search/saveSearchValue'); //검색값 저장
export const saveIsBlocked = createAction('search/saveIsBlocked') //차단된 검색어인지
export const saveAutoStore = createAction('search/saveAutoStore') //자동 저장 여부
export const saveRecentSearchKeywords = createAction('search/saveRecentSearchKeywords'); //최근 키워드 저장

export const saveResultProfile = createAction('search/saveResultProfile'); //결과 프로필 저장
export const saveSearchLastListNo = createAction('search/saveSearchLastListNo'); //몇번째까지 리스트 요청을 했는지
export const searchLoading = createAction('search/searchLoading'); //검색하는 동안 loading
export const setSearchNoData = createAction('search/setSearchNoData'); //검색 페이지에서 밑으로 스크롤시 요청 데이터 없을 때

// Filter
export const refreshSearchProfileList = createAction('search/refreshSearchProfileList');
export const saveSearchMainFilter = createAction('search/saveSearchMainFilter'); 
export const saveSearchPayFilter = createAction('search/saveSearchPayFilter');
export const saveSearchAgeFilter = createAction('search/saveSearchAgeFilter');
export const saveSearchStartDateFilter = createAction('search/saveSearchStartDateFilter');
export const saveSearchSexFilter = createAction('search/saveSearchSexFilter');
export const saveSearchAreaFilter = createAction('search/saveSearchAreaFilter');
export const saveSearchLicenseFilter = createAction('search/saveSearchLicenseFilter');
export const saveSearchWarningFilter = createAction('search/saveSearchWarningFilter');
export const saveSearchStrengthFilter = createAction('search/saveSearchStrengthFilter');
export const saveSearchExceptLicenseFilter = createAction('search/saveSearchExceptLicenseFilter');
export const resetSearchFilter = createAction('search/resetSearchFilter');
export const savePreviousSearchFilter =createAction('search/savePreviousSearchFilter');
export const backToPreviousSearchFilter = createAction('search/backToPreviousSearchFilter');
export const resetSearchMainFilters = createAction('search/resetSearchMainFilters');
export const resetPreviousSearchFilters = createAction('search/resetPreviousSearchFilters');

// Most Searched
export const saveMostSearchedKeyWords = createAction('search/saveMostSearchedKeyWords');
export const saveMostKeyWordsLoading = createAction('search/saveMostKeyWordsLoading');
export const saveMostKeyWord = createAction('search/saveMostKeyWord'); //가장 많이 검색중인 단어에서 검색했는지

// Most Viewed
export const saveMostViewedProfiles = createAction('search/saveMostViewedProfiles');
export const saveMostViewedLoading = createAction('search/saveMostViewedLoading');
export const saveMostViewed = createAction('search/saveMostViewed');