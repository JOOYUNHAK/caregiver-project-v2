/* 역할(보호자, 간병인) */
export enum ROLE { 
    PROTECTOR = 'protector', 
    CAREGIVER = 'caregiver'
}; 
/* 성별(남, 여) */
export enum SEX { 
    MALE = '남', 
    FEMALE = '여'
};
/* 로그인 타입(소셜 로그인 추후 추가) */ 
export enum LOGIN_TYPE { 
    PHONE = 'phone'
}; 

export const phoneRegExp = /^\d{3}\d{3,4}\d{4}$/;
export const birthRegExp = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;