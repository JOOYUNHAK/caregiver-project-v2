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
 export function getCareer (userCareer) {
    const year = Math.floor(userCareer / 12);
    const month = userCareer % 12;
    if(month === 0)
        return `${year}년`
    return `${year}년 ${month}개월`
}

/**
 * 사용자의 일당을 넘겨 받아 똑같은 요금인지 check
 * 똑같으면 추가요금이 없는 보조사
 * @example 12만원 ~ 13만원
 * @param userPay string형식의 사용자 일당
 * @returns 일치하는지 여부 boolean
 */
export function isEqualPay(userPay) {
    const pay = userPay.split('~ ');
    const firstPay = pay[0].substr(0,2);
    const secondPay = pay[1].substr(0,2);
    if(firstPay === secondPay)
        return firstPay;
    return false;
}

/**
 * 선택한 지역들이 많은 사용자를 나누기 위한 함수
 * @param areas  사용자가 선택한 지역들
 * @returns boolean
 */
export function possibleAreaRange(areas) {
    const arr = areas.split(',');
    if(arr.length >=4)
        return true
    return false;
}