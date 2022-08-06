import AsyncStorage from "@react-native-async-storage/async-storage";

//검색어 저장 함수 (기존배열, 새로 넣을 단어)
export async function storeSearchValue(arr, data) {
    const existWords = arr;
    const searchValue = data;

    let tmp, newWords;

    //최근 검색어가 하나도 없었으면
    if (existWords === null) {
        await AsyncStorage.setItem('recentWords', JSON.stringify({ 'word': searchValue }));
    }
    //최근 검색어가 여러개일 경우
    else {
        //최근검색어가 하나만 있는 경우
        if (existWords.length === 1) {
            //하나 있는데 그게 검색하는 값과 같은 경우 그냥 넘어감
            if (existWords[0].word === searchValue);
            //최근 검색한 단어가 가장 먼저 나와야 하기 때문에 기존배열 앞에 추가
            else {
                newWords = [{ 'word': searchValue }, ...existWords];
                await AsyncStorage.setItem('recentWords',
                    JSON.stringify(newWords));
            }
        //최근 검색어가 두개 이상 있는 경우
        } else {
            //검색한 단어가 기존 있던 단어와 같지 않은 경우 그대로 맨 앞 추가
            if ((existWords.find(v => v.word === searchValue)) === undefined) {
                newWords = [{ 'word': searchValue }, ...existWords];
                await AsyncStorage.setItem('recentWords',
                    JSON.stringify(newWords));
            }
            //값이 같은 경우 그 값을 제외한 배열을 반환받아 맨 앞에 검색한 단어를 추가하여 저장
            else {
                tmp = existWords.filter(v => v.word !== searchValue);
                newWords = [{ 'word': searchValue }, ...tmp];
                await AsyncStorage.setItem('recentWords',
                    JSON.stringify(newWords));
            }
        }
    }
};

//전체 단어 삭제
export async function deleteAllWords() {
    await AsyncStorage.removeItem('recentWords');
}

//자동저장 기능
export async function setAutoStore(option) {
    await AsyncStorage.setItem('autoStore', option.toString());
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
    let parseWords = JSON.parse(words);

    //단어가 하나도 없으면
    if (parseWords === null)
        return null;
    //단어가 Array가 아닌 Object면 배열로 만들어서 넘겨줌
    if(parseWords.length === undefined) 
        return [parseWords];

    return parseWords;
}

//자동저장 여부 불러오기
export async function getAutoStore() {
    const autoStore = await AsyncStorage.getItem('autoStore');
    
    if( autoStore === null || autoStore === 'true' )
        return true;
    
    return false;
}

