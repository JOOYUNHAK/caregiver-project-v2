import { Transform, Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Max, Min, ValidateNested } from "class-validator";
import { Time } from "src/common/shared/type/time.type";
import { ROLE, SEX, birthRegExp, phoneRegExp } from "src/user-auth-common/domain/enum/user.enum";
import { PossibleDate } from "src/profile/domain/enum/possible-date.enum";

/* 보호자, 간병인 공통 회원가입 작성 페이지 */
export class CommonRegisterForm {
    @Matches(phoneRegExp)
    readonly id: string; // 아이디( 전화번호 )

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @Transform(({ value }) => value.toString())
    @Matches(birthRegExp)
    readonly birth: number;

    @IsEnum(SEX)
    readonly sex: SEX;

    @IsEnum(ROLE)
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
    @Min(1)
    @Max(300)
    @IsNumber()
    readonly weight: number;

    @IsEnum(SEX)
    readonly patientSex: SEX; // 환자 성별

    @IsNotEmpty()
    @IsString()
    readonly diagnosis: string; // 환자 진단명

    @Transform(({ value }) => new Date(value))
    @IsNotEmpty()
    @IsDate()
    readonly startPeriod: Time; // 간병 시작일

    @Transform(({ value }) => new Date(value))
    @IsNotEmpty()
    @IsDate()
    readonly endPeriod: Time; // 간병 마무리

    @IsNotEmpty()
    @Min(1)
    @IsNumber()
    readonly totalPeriod: number; // 간병 총 일수

    @IsNotEmpty()
    @IsString()
    readonly place: string; // 간병하게 될 장소

    @IsNotEmpty()
    @IsBoolean()
    readonly isNext: boolean; // 다음병원 예정 여부

    @IsNotEmpty()
    @IsString()
    readonly patientState: string; // 자세한 환자 정보

    static of(startDate: Time = new Date(), endDate: Time = new Date(), totalPeriod: number, weight: number = 60) {
        return {
            weight,
            patientSex: SEX.MALE,
            diagnosis: '뇌출혈',
            startPeriod: startDate,
            endPeriod: endDate,
            totalPeriod,
            place: '인천광역시 테스트구',
            isNext: false,
            patientState: '환자의 자세한 몸상태입니다.'
        };
    };
}

/* 간병인, 보호자 공통 도움에 관한 작성 리스트 */ 
export class CommomHelpList {
    @IsOptional()
    @IsString()
    readonly suction?: string; // 가래 관련

    @IsOptional()
    @IsString()
    readonly toilet?: string; // 용변 관련

    @IsOptional()
    @IsString()
    readonly movement?: string; // 거동 관련

    @IsOptional()
    @IsString()
    readonly washing?: string; // 청결 관련
};

/* 보호자 두번째 회원가입 페이지( 환자가 필요로 하는 도움 ) */
export class PatientHelpList extends CommomHelpList {

    @IsOptional()
    @IsString()
    readonly meal?: string; // 식사 관련

    @IsOptional()
    @IsString()
    readonly badChair?: string // 휠체어 관련

    static of(
        suction: string, toilet: string, movement: string,
        meal: string, washing: string, badChair: string
    ) {
        return { suction, toilet, movement, meal, washing, badChair };
    }
};

/* 간병인은 공통 작성 문항만 작성 */
export class CaregiverHelpExperience extends CommomHelpList {
    static of(
        suction: string, toilet: string, movement: string, washing: string,
    ) {
        return { suction, toilet, movement, washing };
    }
}

/* 간병인 정보 양식 */
export class CaregiverInfoForm {
    @Min(1)
    @Max(300)
    @IsNumber()
    readonly weight: number;

    @Min(1)
    @Max(300)
    @IsNumber()
    readonly career: number;

    @Min(1)
    @Max(50)
    @IsNumber()
    readonly pay: number;

    @IsNotEmpty()
    @IsEnum(PossibleDate)
    readonly possibleDate: PossibleDate;

    @IsNotEmpty()
    @IsString()
    readonly nextHospital: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    readonly possibleAreaList: string[];

    @IsArray()
    @ArrayMinSize(0)
    @IsString({ each: true })
    readonly licenseList: string[];

    static of(
        possibleAreaList: string[] = ['인천', '경기'],
        licenseList: string[] = ['응급구조사'],
    ) {
        return {
            weight: 60,
            career: 10,
            pay: 10,
            possibleDate: PossibleDate.IMMEDATELY,
            nextHospital: '다음 병원 예약 여부',
            possibleAreaList,
            licenseList,
        };
    }
};

/* 간병인 세번째 회원가입 양식 */
export class CaregiverThirdRegisterDto {
    @ValidateNested()
    @Type(() => CaregiverHelpExperience)
    readonly helpExperience: CaregiverHelpExperience;

    @IsArray()
    @ArrayMinSize(0)
    @IsString({ each: true })
    readonly strengthList: string[];

    @IsArray()
    @ArrayMinSize(3)
    @ArrayMaxSize(3)
    @IsString({ each: true })
    readonly tagList: string[];

    static of(
        helpExperience: CaregiverHelpExperience = { suction: '석션' },
        strengthList: string[] = ['강점 1, 강점 2'],
        tagList: string[] = ['태그1', '태그2', '태그3'],
    ) {
        return { helpExperience, strengthList, tagList }
    }
}

/* 간병인 마지막 회원가입 양식 */
export class CaregiverLastRegisterDto {
    @IsNotEmpty()
    @IsString()
    readonly notice: string;

    @IsNotEmpty()
    @IsString()
    readonly additionalChargeCase: string;

    static of() {
        return {
            notice: '공지를 알려드립니다',
            additionalChargeCase: '추가요금은 없습니다'
        };
    };
};