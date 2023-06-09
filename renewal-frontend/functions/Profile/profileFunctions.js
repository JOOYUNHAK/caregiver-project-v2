/**
 * 사용자 출생년도를 나이로 변환해 return 해주는 함수
 * @param userBirth 사용자의 출생년도
 * @returns 
 */
export function getAge(userBirth) {
    const date = new Date();
    const userYear = userBirth.substr(0, 4);
    const year = date.getFullYear();
    const userAge = year - parseInt(userYear) + 1;
    return userAge;
}

/**
 * 개월수를 년 연도로 바꿔주는 함수
 * @param userCareer 개월수로 입력받은 사용자 경력
 * @returns 년 월로 바꾼 Text
 */
export function getCareer(userCareer) {
    const year = Math.floor(userCareer / 12);
    const month = userCareer % 12;
    if (month == 0) {
        if(year == 0)
            return '초보'
        return `${year}년`
    }
    else if(year == 0 && month != 0)
        return `${month}개월`
    return `${year}년 ${month}개월`
}

/**
 * 선택한 지역들이 많은 사용자를 나누기 위한 함수
 * @param areas  사용자가 선택한 지역들
 * @returns boolean
 */
export function possibleAreaRange(areas) {
    const arr = areas.split(',');
    if (arr.length >= 4)
        return true
    return false;
}

/**
 * 선택한 시작 시점에 해당하는 가중치를 기간으로 보여주는 함수
 * @param weight 각 날짜의 가중치
 * @returns string
 */
export function changeStartDate(weight) {
    switch (weight) {
        case '1':
            return '즉시가능'
        case '2':
            return '1주 이내'
        case '3':
            return '2주 이내'
        case '4':
            return '3주 이내'
        case '5':
            return '한달 이내'
    }
}
/**
 * 리스트가 오면 분리해서 배열,아니면 바로 배열로 변환해서 return
 * @param string 배열로 변환하고싶은 문자열
 * @returns 배열
 */
export function stringToArray(string) {
    if(string.includes(',')) {
        const arr = string.split(',');
        return arr;
    }
    return [string];
}