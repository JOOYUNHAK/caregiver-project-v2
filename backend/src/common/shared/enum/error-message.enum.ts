export const enum ErrorMessage {
    PhoneNumberFormat = '휴대폰번호 형식을 확인해주세요',
    DuplicatedPhoneNumber = '이미 가입된 전화번호입니다.',
    ExpiredSmsCode = '인증유효시간이 초과되었습니다. 다시 시도해 주세요.',
    NotMatchedAuthenticationCode = '인증번호가 일치하지 않습니다.',
    ExceededPhoneDailyLimit = '일일 가능한 인증횟수를 초과하였습니다.',
    ExceededCodeAttempLimit = '인증번호를 연속으로 틀렸습니다.',
    NotExistUser = '일치하는 사용자 정보를 찾을 수 없습니다.',
    NotExistUserInSessionList = '현재 로그인정보에 없는 사용자입니다.',
    InvalidRefreshKey = '유효하지 않은 RefreshKey입니다.',
    NotExistRefreshKeyInRequest = '요청에 RefreshKey가 존재하지 않습니다.',
    ExpiredToken = 'jwt expired',
    NotFoundProfile = '현재 해당 프로필은 비공개, 탈퇴의 이유로 찾을 수 없습니다.'
}