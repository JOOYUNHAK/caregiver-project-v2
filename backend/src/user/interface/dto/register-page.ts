import { Time } from "src/common/shared/type/time.type";
import { ROLE, SEX } from "src/user-auth-common/domain/enum/user.enum";

/* 보호자, 간병인 공통 회원가입 작성 페이지 */
export class CommonRegisterForm {
    readonly id: string; // 아이디( 전화번호 )
    readonly name: string;
    readonly birth: number;
    readonly sex: SEX;
    readonly purpose: ROLE;

    static of(phoneNumber: string, name: string, birth: number, sex: SEX, role: ROLE) {
        return {
            id: phoneNumber,
            name,
            birth,
            sex,
            purpose: role
        };
    };
}

/* 보호자 첫번째 회원가입 페이지( 환자 정보 ) */
export class PatientInfoForm {
    readonly weight: number; 
    readonly patientSex: SEX; // 환자 성별
    readonly diagnosis: string; // 환자 진단명
    readonly startPeriod: Time; // 간병 시작일
    readonly endPeriod: Time; // 간병 마무리
    readonly totalPeriod: number; // 간병 총 일수
    readonly place: string; // 간병하게 될 장소
    readonly isNext: boolean; // 다음병원 예정 여부
    readonly patientState: string; // 자세한 환자 정보
    
    static of(
        weight: number, patientSex: SEX, diagnosis: string, startDate: Time,
        endDate: Time, totalPeriod: number, place: string, isNext: boolean, condition: string 
    ) {
        return {
            weight,
            patientSex,
            diagnosis,
            startPeriod: startDate,
            endPeriod: endDate,
            totalPeriod,
            place,
            isNext,
            patientState: condition
        };
    };
}

/* 보호자 두번째 회원가입 페이지( 환자가 필요로 하는 도움 ) */
export class PatientHelpListForm {
    readonly suction?: string; // 가래 관련
    readonly toilet?: string; // 용변 관련
    readonly movement?: string; // 거동 관련
    readonly meal?: string; // 식사 관련
    readonly washing?: string; // 청결 관련
    readonly badChair?: string // 휠체어 관련

    static of(
        suction: string, toilet: string, movement: string, 
        meal: string, washing: string, badChair: string
    ) {
        return { suction, toilet, movement, meal, washing, badChair };
    }
}