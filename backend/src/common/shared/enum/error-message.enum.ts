export const enum ErrorMessage {
    PhoneNumberFormat = '휴대폰번호 형식을 확인해주세요',
    DuplicatedPhoneNumber = '이미 가입된 전화번호입니다.',
    ExpiredSmsCode = '인증유효시간이 초과되었습니다. 다시 시도해 주세요.',
    NotMatchedAuthenticationCode = '인증번호가 일치하지 않습니다.',
    ExceededPhoneDailyLimit = '일일 가능한 인증횟수를 초과하였습니다.',
    ExceededCodeAttempLimit = '인증번호를 연속으로 틀렸습니다.',
    NotExistUserInSessionList = '현재 로그인정보에 없는 사용자입니다.'
}