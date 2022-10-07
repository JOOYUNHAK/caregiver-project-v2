import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveAutoStore, saveIsBlocked, saveRecentSearchKeywords } from "../redux/action/search/searchAction";
import store from "../redux/store";

/**
 * 검색시 최근 검색어 내 핸드폰에 저장
 * @param {*} searchValue 검색어
 */
export async function storeSearchValue(searchValue) {
    
    const isValuePassed = searchValueCheck(searchValue); //차단된 검색어인지
    const isAutoStore = await getAutoStore(); //최근 검색어 저장 켜져있는지
    
    if( isValuePassed ) {
        if ( isAutoStore )
            store.dispatch(saveIsBlocked(false));
        else return;
    }
    else {
        store.dispatch(saveIsBlocked(true));
        return;
    };
        
    const recentKeywords = await AsyncStorage.getItem('recentWords'); //현재 저장되어 있는 최근 검색어 목록
    let recentKeywordsArr = JSON.parse(recentKeywords); //배열로 변경

    //최근 검색어가 하나도 없었으면
    if (recentKeywordsArr === null) {
        const _newArr = [searchValue];
        store.dispatch( saveRecentSearchKeywords( _newArr ))
        await AsyncStorage.setItem('recentWords', JSON.stringify(_newArr));
    }
    //최근 검색어가 여러개일 경우
    else {
        //이미 있는 경우
        if( recentKeywordsArr.includes(searchValue) ) {
            //배열길이가 1이 아니면
            if (recentKeywordsArr.length != 1) {
                // 중복된 값을 제외한 배열 반환
                recentKeywordsArr = recentKeywordsArr.filter(
                    words => words !== searchValue
                );
                // 검색한 단어 맨 앞 추가
                recentKeywordsArr.unshift(searchValue);
            }
        }
        //없는 경우
        else {
            recentKeywordsArr.unshift(searchValue);
        }
        await AsyncStorage.setItem('recentWords', JSON.stringify(recentKeywordsArr));
        store.dispatch( saveRecentSearchKeywords( recentKeywordsArr ));
    }
};

//전체 단어 삭제
export async function deleteAllWords() {
    await AsyncStorage.removeItem('recentWords');
    store.dispatch( saveRecentSearchKeywords( null ));
}

export async function deleteOneWord( existArr, keyWord ) {
    const newArr = existArr.filter( word => word !== keyWord);
    store.dispatch( saveRecentSearchKeywords( newArr ));
    await AsyncStorage.setItem('recentWords', JSON.stringify(newArr));
}

//자동저장 기능
export async function setAutoStore(autoStore) {
    await AsyncStorage.setItem('autoStore', JSON.stringify( autoStore ));
    store.dispatch( saveAutoStore( autoStore ));
}

//검색어가 불건전한 단어인지 (검색 단어)
export function searchValueCheck (searchValue ) {

    let isPassed = true;

    const englishFilterWord = /\b(:?sex|boob|dick|penis|nigger)\b/i;
    
    if(englishFilterWord.test(searchValue)) {
        isPassed = false;
        return isPassed;
    }

    const koreanFilterWord = [
        "섹스",
        "보지",
        "자지",
        "창녀",
        "애미",
        "정액",
        "일베",
    ];

    koreanFilterWord.forEach((word) => {
        if(word === searchValue)
            isPassed = false;
    })
    return isPassed;
}

//최근 검색했던 단어들 불러오기
export async function getStoreWords() {
    const words = await AsyncStorage.getItem('recentWords');
    if ( !words )
        return null;
    return JSON.parse(words);
}

//자동저장 여부 불러오기
export async function getAutoStore() {
    const autoStore = await AsyncStorage.getItem('autoStore');

    if( autoStore === null || autoStore === 'true' )
        return true;
    
    return false;
}

