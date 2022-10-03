/* 프로필 api 중 목록 받아오기 */

import { useNavigation } from "@react-navigation/native";
import api from "../../config/CustomAxios";
import { listLoading, saveCareGiverProfile, saveLastListNo } from "../../redux/action/profile/profileAction";
import store from "../../redux/store";


export default async function requestProfileList(purpose) {
    try {
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

        const start = store.getState().profile.lastListNo;

        start == 0 ? store.dispatch(listLoading(true)) : null
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
                start: start
            }
        });
        //const endTime = Date.now();
        //console.log(endTime - startTime)
        const profileList = res.data;
        if (purpose === 'careGiver') {
            store.dispatch(saveCareGiverProfile(profileList));
            store.dispatch(saveLastListNo(start + 5));
            start == 0 ? store.dispatch(listLoading(false)) : null;
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

function getMainFilterValue(mainFilter) {
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

function getPayFilterValue(payFilter) {
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

function getStartDateFilterValue(startDateFilter) {
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

function getAgeFilterValue(ageFilter) {
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

function getAreaFilterValue(areaFilter) {
    if (areaFilter.length)
        return areaFilter.join(',');
    return undefined;
};

function getLicenseFilterValue(licenseFilter) {
    if (licenseFilter.length)
        return licenseFilter.join(',');
    return undefined;
}