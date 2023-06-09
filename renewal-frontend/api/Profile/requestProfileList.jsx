/* 프로필 api 중 목록 받아오기 */

import { useNavigation } from "@react-navigation/native";
import api from "../../config/CustomAxios";
import { listLoading, saveCareGiverProfile, saveLastListNo, setNoData } from "../../redux/action/profile/profileAction";
import store from "../../redux/store";

export default async function requestProfileList(purpose) {
    try {
        const {lastListNo, noData } = store.getState().profile;
        if ( noData ) return; //스크롤 끝에 도달했는데 더이상 받을 데이터가 없을 때
        
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
        lastListNo == 0 ? store.dispatch(listLoading(true)) : null
        //const startTime = Date.now();
        const res = await api.get(`user/profile/${purpose}`, {
            params: {
                mainFilter: mainFilter,
                payFilter: payFilter,
                startDateFilter: startDateFilter,
                sexFilter: sexFilter,
                ageFilter: ageFilter,
                areaFilter: areaFilter,
                licenseFilter: licenseFilter,
                warningFilter: warningFilter,
                strengthFilter: strengthFilter,
                exceptLicenseFilter: exceptLicenseFilter,
                start: lastListNo
            }
        });
        //const endTime = Date.now();
        //console.log(endTime - startTime)
        const profileList = res.data;

        if (purpose === 'careGiver') {
            lastListNo == 0 ? store.dispatch(listLoading(false)) : null;
            //받을 데이터가 더이상 없는경우
            if( !profileList.length ) {
                store.dispatch(setNoData(true));    
                return;
            }
            store.dispatch(saveCareGiverProfile(profileList));
            store.dispatch(saveLastListNo(lastListNo + 5));
            store.dispatch(setNoData(false));
        }
        else {
            console.log('assistant')
        }
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
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
            return 'heart';
        case '일당 낮은 순':
            return 'pay';
        case '시작일 빠른 순':
            return 'startDate';
    }
}

export function getPayFilterValue(payFilter) {
    switch (payFilter) {
        case '일당':
            return undefined;
        case '10만원 이하':
            return 'under10';
        case '15만원 이하':
            return 'under15';
        case '20만원 이하':
            return 'under20';
    };
};

export function getStartDateFilterValue(startDateFilter) {
    switch (startDateFilter) {
        case '시작가능일':
            return undefined;
        case '즉시 가능':
            return 'immediately';
        case '1주 이내':
            return '1week';
        case '2주 이내':
            return '2week';
        case '3주 이내':
            return '3week';
        case '한 달 이후':
            return 'month'
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
    if (areaFilter.length)
        return areaFilter.join(',');
    return undefined;
};

export function getLicenseFilterValue(licenseFilter) {
    if (licenseFilter.length)
        return licenseFilter.join(',');
    return undefined;
}