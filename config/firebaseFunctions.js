import firebase from 'firebase/compat/app';

const englishReg = /^[a-zA-Z]/;  //영어로 시작하는지
const numberReg = /^[0-9]/; //숫자로 시작하는지 
const choSungReg = /^[ㄱ-ㅎ]+/;

export async function getStorageWords(setInitEnglishWords, setInitNumberWords, setInitKoreaWords) {
    const db = firebase.firestore();
    const englishDataRef = db.collection('SearchData').doc('english');
    const englishDbGet = await englishDataRef.get();
    const englishDbData = englishDbGet.data().value;
    setInitEnglishWords(englishDbData);

    const numberDataRef = db.collection('SearchData').doc('number');
    const numberDbGet = await numberDataRef.get();
    const numberDbData = numberDbGet.data().value;
    setInitNumberWords(numberDbData);

    const koreaDataRef = db.collection('SearchData').doc('korea');
    const koreaDbGet = await koreaDataRef.get();
    const koreaDbData = koreaDbGet.data().value;
    setInitKoreaWords(koreaDbData);
}

function getKoreaData(searchValue, eachData) {
    searchValue = searchValue.replace(/ /g, "");

    const koreaReg = /^[ㄱ-ㅎ]/;
    //초성들
    const choSungData = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ",
        "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    //종성들
    const jongSungData = ["ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ",
        "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

    const searchValueLength = searchValue.length; //입력받은 문자 길이

    const searchValueFirstWord = searchValue.charAt(searchValueLength - 1); //입력 받은 글자의 마지막 단어

    const eachDataFirstWord = eachData.charCodeAt(searchValueLength - 1);
    const eachDataChoIndex = Math.floor((eachDataFirstWord - 0xAC00) / 588); //기존 데이터의 초성구하기

    const searchValueJungIndex = Math.floor((searchValue.charCodeAt(searchValueLength - 1) - 0xAC00) / 28) % 21;
    const searchValueJongIndex = Math.floor((searchValue.charCodeAt(searchValueLength - 1) - 0xAC00) % 28);

    //입력 받은 값의 마지막 글자가 초성인 경우
    if (koreaReg.test(searchValue.charAt(searchValueLength - 1))) {

        if (searchValueLength == 1) {
            //길이가 1인데 초성만 있는경우
            if (searchValueFirstWord === choSungData[eachDataChoIndex])
                return true;
            return false;

        } else { //길이가 1이상인데 마지막 글자가 초성
            //앞에 글자까지 모두 초성인경우
            if(choSungReg.test(searchValue)) {
                let choSungWords = '';
                //기존의 데이터를 입력값의 길이까지만 초성만 구해서 이어붙인 문자로 비교
                for(let i = 0; i < searchValueLength; i++) {
                    const eachChoSungIndex = Math.floor((eachData.charCodeAt(i) - 0xAC00) / 588);
                    const eachChoSung = choSungData[eachChoSungIndex];
                    choSungWords += eachChoSung;
                }
                if(searchValue === choSungWords)
                    return true;
                return false;
            }
            //앞에 글자가 초성이 아닌 경우
            
            //앞에 글자가 중성까지만 되어 있을 경우
            //마지막 초성을 앞 글자의 종성으로 붙여준다.
            const findIndex = jongSungData.indexOf(searchValue.charAt(searchValueLength-1)) + 1;
            const newWord = String.fromCharCode(searchValue.charCodeAt(searchValueLength-2)+findIndex);
            const newReg = new RegExp(`${newWord}`);
            if(newReg.test(eachData))
                return true;
            
            const subStr = searchValue.substr(0, searchValueLength - 1)
            const subStrReg = new RegExp(`^${subStr}`)
            if (subStrReg.test(eachData)) 
            //초성으로만 시작하는 단어 앞에 글자까지 일치하는 단어중에 입력값의 길이보다 길이가 긴것
                if (eachData.length >= searchValue.length) 
                    return true;
            return false;
        }

    }
    //중성이 있는 경우
    else if (searchValueJungIndex >= 0) {
        //종성도 있는 경우
        if (searchValueJongIndex > 0) {
            //종성까지 맞는 단어가 있는 경우
            const jongReg = new RegExp(`^${searchValue}`);
            if ((jongReg.test(eachData)))
                return true;
            else {
                //맞는 단어가 없는 경우
                const nextChoSung = jongSungData[searchValueJongIndex - 1]; //종성을 없애고 다음단어의 초성을 종성으로 맞춤
                //입력값의 마지막글자의 종성을 중성까지로 이루어진 단어로 만듬(ex: 롷-> 로)
                const replaceWord = String.fromCharCode(
                    searchValue.charCodeAt(searchValueLength - 1) - searchValueJongIndex);
                //종성을 제외한 글자로 새로운 글자를 맞춤(ex: 나롷 -> 나로)
                const subStr = searchValue.substr(0, searchValueLength - 1) + replaceWord;
                const subStrReg = new RegExp(`^${subStr}`);
                
                //기존 데이터 단어의 마지막 글자의 초성(입력값은 길이가 1 줄어들었으므로 기존 입력값 길이의 1을 안뺌)
                const eachDataNewFirstWord = eachData.charCodeAt(searchValueLength);
                const newFirstWordIndex = Math.floor((eachDataNewFirstWord - 0xAC00) / 588);

                if (subStrReg.test(eachData))
                    if (nextChoSung === choSungData[newFirstWordIndex])
                        return true;
            }
            return false;

        }
        //중성으로만 이루어진 해당 중성까지 일치하고 종성도 있는 단어 추가
        const jungReg = new RegExp(`^${searchValue}`)
        const searchValueCode = searchValue.charCodeAt(searchValueLength - 1); //입력 값 마지막 단어의 유니코드
        const eachDataCode = eachData.charCodeAt(searchValueLength - 1) //기존 데이터의 단어의 마지막 단어 유니코드
        const firstRange = searchValueCode + 1;
        const lastRange = searchValueCode + 27;
        if ((jungReg.test(eachData)) ||
            (firstRange <= eachDataCode && eachDataCode <= lastRange))
            return true;
        return false;
    }
}

export function getFilterWord(eachLanguageData, searchValue, setFilterData) {
    searchValue = searchValue.replace(/ /g, "");
    const lowerSearchValue = searchValue.toLowerCase();
    let valueReg = new RegExp(`^${lowerSearchValue}`);
    if (englishReg.test(searchValue)) {
        setFilterData(eachLanguageData.filter(eachData => {
            return (valueReg.test(eachData));
        }))
    }
    else if (numberReg.test(searchValue)) {
        setFilterData(eachLanguageData.filter(eachData => {
            console.log(eachData.word)
            return (valueReg.test(eachData.word));
        }))

    } //한글
    else {
        const filterData = eachLanguageData.filter(eachData => {
            return getKoreaData(searchValue, eachData.word);
        })
        setFilterData(filterData);
    }
}

