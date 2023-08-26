/* 프로필 api 중 목록 받아오기 */

import api from "../../config/CustomAxios";
import { listLoading, saveCareGiverProfile, saveLastProfileId, setNoData } from "../../redux/action/profile/profileAction";
import store from "../../redux/store";

export default async function requestProfileList(purpose) {
    try {
        const { lastListNo, noData } = store.getState().profile;
        if (noData) return; //스크롤 끝에 도달했는데 더이상 받을 데이터가 없을 때

        let { mainFilter, payFilter, startDateFilter, sexFilter, ageFilter,
            areaFilter, licenseFilter, warningFilter, strengthFilter, exceptLicenseFilter } = store.getState().profile.filters;

        mainFilter = getMainFilterValue(mainFilter);
        payFilter = getPayFilterValue(payFilter);
        startDateFilter = getStartDateFilterValue(startDateFilter);
        sexFilter = !!sexFilter ? sexFilter : undefined;
        ageFilter = getAgeFilterValue(ageFilter);
        areaFilter = getAreaFilterValue(areaFilter);
        licenseFilter = getLicenseFilterValue(licenseFilter);
        warningFilter = warningFilter ? true : undefined;
        strengthFilter = strengthFilter ? true : undefined;
        exceptLicenseFilter = exceptLicenseFilter ? true : undefined;

        //첫 데이터 요청시에만 데이터 로딩 중 표시 이후 스크롤 요청시에는 데이터 로팅 표시 x
        if( !lastListNo ) store.dispatch(listLoading(true));
       
        const res = await api.get(`profile/list`, {
            params: {
                nextCursor: lastListNo,
                sort: mainFilter,
                filter: {
                    pay: payFilter,
                    startDate: startDateFilter,
                    sex: sexFilter,
                    age: ageFilter,
                    area: areaFilter,
                    license: licenseFilter,
                    warningExcept: warningFilter,
                    strengthExcept: strengthFilter,
                }
            }
        });  

        /* 첫 프로필 리스트의 조회 결과를 받아왔으면 Loading 해제 */
        if( !lastListNo ) store.dispatch(listLoading(false));
        const { caregiverProfileListData, nextCursor } = res.data;
        /* 더 이상 프로필 데이터가 없을 때 */
        if( !caregiverProfileListData.length ) {
            store.dispatch(setNoData(true));
            return;
        };

        /* 아직 프로필 데이터가 조회될 때 다음을 위해 저장 */
        store.dispatch(saveCareGiverProfile(caregiverProfileListData));
        store.dispatch(saveLastProfileId(nextCursor));
        store.dispatch(setNoData(false));
    }
    catch (err) {
        console.log(err.response);
    }
}

export function getMainFilterValue(mainFilter) {
    switch (mainFilter) {
        case '기본순':
            return undefined;
        case '별점 높은 순':
            return 'star';
        case '후기 많은 순':
            return 'review';
        case '찜 많은 순':
            return 'HighLike';
        case '일당 낮은 순':
            return 'LowPay';
        case '시작일 빠른 순':
            return 'FastStartDate';
    }
}

export function getPayFilterValue(payFilter) {
    switch (payFilter) {
        case '일당':
            return undefined;
        case '10만원 이하':
            return 10;
        case '15만원 이하':
            return 15;
        case '20만원 이하':
            return 20;
    };
};

export function getStartDateFilterValue(startDateFilter) {
    switch (startDateFilter) {
        case '시작가능일':
            return undefined;
        case '즉시 가능':
            return 1;
        case '1주 이내':
            return 2;
        case '2주 이내':
            return 3;
        case '3주 이내':
            return 4;
        case '한 달 이후':
            return 5;
    };
};

export function getAgeFilterValue(ageFilter) {
    switch (ageFilter) {
        case '나이':
            return undefined;
        case '20대':
            return 20
        case '30대':
            return 30
        case '40대':
            return 40
        case '50대':
            return 50
        case '60대':
            return 60
    };
};

export function getAreaFilterValue(areaFilter) {
    return areaFilter.length ? areaFilter : undefined;
};

export function getLicenseFilterValue(licenseFilter) {
    return licenseFilter.length ? licenseFilter : undefined;
}