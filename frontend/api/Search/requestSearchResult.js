/* 프로필 검색결과 */
'use strict'

import api from "../../config/CustomAxios";
import { saveIsBlocked, saveMostKeyWord, saveResultProfile, saveSearchLastListNo, searchLoading, setSearchNoData, } from "../../redux/action/search/searchAction";
import store from "../../redux/store";
import { getAgeFilterValue, getAreaFilterValue, getLicenseFilterValue, getMainFilterValue, getPayFilterValue, getStartDateFilterValue } from "../Profile/requestProfileList";

export default async function requestSearchResult() {
    //사용자가 밑으로 스크롤 중 더이상 스크롤해도 받아오는 데이터가 없을 땐 그냥 return
    let { searchValue, searchLastListNo, 
            searchNoData, mostKeyWord} = store.getState().search;
    
    if( searchNoData ) return;
    
    let { mainFilter, payFilter, startDateFilter,sexFilter, ageFilter, 
            areaFilter, licenseFilter, warningFilter, strengthFilter } = store.getState().search.filters;
    
    mainFilter = getMainFilterValue(mainFilter);
    payFilter = getPayFilterValue(payFilter);
    startDateFilter = getStartDateFilterValue(startDateFilter);
    sexFilter = !!sexFilter ? sexFilter :undefined;
    ageFilter = getAgeFilterValue(ageFilter);
    areaFilter = getAreaFilterValue(areaFilter);
    licenseFilter = getLicenseFilterValue(licenseFilter);
    warningFilter = warningFilter ? true : undefined;
    strengthFilter = strengthFilter ? true : undefined;
    mostKeyWord = mostKeyWord ? true : undefined;

    try {
        searchLastListNo == 0 ? store.dispatch(searchLoading(true)) : null;
        store.dispatch(saveIsBlocked(false));
        const res = await api.get('search', {
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
                keyWord: searchValue,
                start: searchLastListNo,
                mostKeyWord: mostKeyWord
            }
        })
        const searchResult = res.data;
        searchLastListNo == 0 ? store.dispatch(searchLoading(false)) : null;
        store.dispatch(saveMostKeyWord(false)); 
        //더이상 데이터가 없는 경우 그 이후부턴 요청 x
        if( !searchResult[0].length ) {
            store.dispatch(setSearchNoData(true));
            return;
        }
        //결과 프로필 저장
        store.dispatch(saveResultProfile(searchResult));
        store.dispatch(saveSearchLastListNo(searchLastListNo + 5));
        store.dispatch(setSearchNoData(false));
    }
    catch (err) {
        console.log(err.response)
    }
}