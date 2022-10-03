import { createAction } from "@reduxjs/toolkit";

export const saveCareGiverProfile = createAction('profile/saveCareGiverProfile');
export const saveAssistantProfile = createAction('profile/saveAssistantProfile');
export const saveProtectorProfile = createAction('profile/saveProtectorProfile');
export const saveUserProfile = createAction('profile/saveUserProfile');
export const saveLastListNo = createAction('profile/saveLastListNo'); //현재 요청한 프로필의 마지막 번호
export const refreshProfileList = createAction('profile/refreshProfileList'); //새로고침 했을 때 action
export const removeNotFoundProfile = createAction('profile/removeNotFoundProfile'); //찾지 못하는 프로필 목록에서 제거

// Filter
export const saveMainFilter = createAction('profile/saveMainFilter'); 
export const savePayFilter = createAction('profile/savePayFilter');
export const saveAgeFilter = createAction('profile/saveAgeFilter');
export const saveStartDateFilter = createAction('profile/saveStartDateFilter');
export const saveSexFilter = createAction('profile/saveSexFilter');
export const saveAreaFilter = createAction('profile/saveAreaFilter');
export const saveLicenseFilter = createAction('profile/saveLicenseFilter');
export const saveWarningFilter = createAction('profile/saveWarningFilter');
export const saveStrengthFilter = createAction('profile/saveStrengthFilter');
export const saveExceptLicenseFilter = createAction('profile/saveExceptLicenseFilter');
export const resetFilter = createAction('profile/resetFilter');
export const savePreviousFilter =createAction('profile/savePreviousFilter');
export const backToPreviousFilter = createAction('profile/backToPreviousFilter');
export const resetMainFilters = createAction('profile/resetMainFilters');


//찜
export const completeHeart = createAction('profile/completeHeart'); //찜 완료했는지
export const toggleHeart = createAction('profile/toggleHeart'); //찜하기
export const listLoading = createAction('profile/listLoading'); //리스트 로딩
export const resetHeartList = createAction('profile/resetHeartList'); //찜 목록 초기화
export const saveHeartListProfile = createAction('profile/saveHeartListProfile'); //찜 목록 

