import 'reflect-metadata';
import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { ROLE, SEX } from "src/user-auth-common/domain/enum/user.enum"
import { CaregiverHelpExperience, CaregiverInfoForm, CaregiverThirdRegisterDto, CommonRegisterForm, PatientHelpList, PatientInfoForm } from "src/user/interface/dto/register-page"

describe('회원가입의 각 양식 Dto Validator Test', () => {
    describe('공통 회원가입 양식(CommonRegisterForm)', () => {
        it('잘못된 전화번호 양식이 결과에 포함되어야 한다.', async () => {
            /* id필드에 잘못된 값 테스트 */
            const wrongPhoneNumber = '010111111111'
            const testForm = plainToInstance(CommonRegisterForm, CommonRegisterForm.of(wrongPhoneNumber, '테스트', 19980101, SEX.MALE, ROLE.PROTECTOR));
            const [result] = await validate(testForm);

            expect(result.property).toBe("id");
            expect(result.value).toBe(wrongPhoneNumber);
        });

        it('잘못된 생년월일 양식이 결과에 포함되어야 한다.', async () => {
            const wrongBirth = 19980332;
            const testForm = plainToInstance(CommonRegisterForm, CommonRegisterForm.of('01011111111', '테스트', wrongBirth, SEX.MALE, ROLE.PROTECTOR));

            const [result] = await validate(testForm);

            expect(result.property).toBe("birth");
            expect(result.value).toBe(wrongBirth.toString())
        });

        it('잘못된 Enum 타입들은 결과에 포함되어야 한다.', async () => {
            const wrongSexEnum = '남자' as SEX; // '남', '여'
            const wrongRoleEnum = 'player' as ROLE; // 'protector', 'caregiver'
            const testForm = plainToInstance(CommonRegisterForm, CommonRegisterForm.of('01011111111', '테스트', 19980101, wrongSexEnum, wrongRoleEnum));

            const [sexEnumResult, roleEnumResult] = await validate(testForm);

            expect(sexEnumResult.property).toBe("sex");
            expect(sexEnumResult.value).toBe(wrongSexEnum);

            expect(roleEnumResult.property).toBe("purpose");
            expect(roleEnumResult.value).toBe(wrongRoleEnum);
        });
    })

    describe('환자 정보 양식(PatientInfoForm) Test', () => {
        it('몸무게는 1 ~ 300사이의 숫자여야 한다', async () => {
            const wrongWeight = 0;
            const testForm = plainToInstance(
                PatientInfoForm,
                PatientInfoForm.of(new Date(), new Date(), 1, wrongWeight)
            );
            const [result] = await validate(testForm);

            expect(result.property).toBe('weight');
            expect(result.value).toBe(wrongWeight);
        });

        it('날짜형식은 Date형식만 통과되어야 한다', async () => {
            const wrongDate = '20220303' as unknown as Date;
            const testForm = plainToInstance(
                PatientInfoForm,
                PatientInfoForm.of(wrongDate, new Date(), 1)
            );
            const [result] = await validate(testForm);
            expect(result.property).toBe('startPeriod');
        });
    });

    describe('환자의 도움 리스트 양식(PatientHelpListForm) Test', () => {
        it('모든 문항이 채워져 있지 않아도 된다', async () => {
            const testForm = plainToInstance(
                PatientHelpList,
                PatientHelpList.of(
                    '석션 도움 리스트',
                    undefined,
                    undefined,
                    '식사 도움 리스트',
                    undefined,
                    '휠체어 도움 리스트'
                )
            );
            const result = await validate(testForm);

            expect(result).toEqual([]);
        })
    });

    describe('간병인 정보 양식(CaregiverInfoForm) Test', () => {
        it('가능한 지역들은 배열의 길이가 최소 1이여야 한다', async () => {
            const areaErrorDto = plainToInstance(
                CaregiverInfoForm,
                CaregiverInfoForm.of([], undefined)
            );

            const [result] = await validate(areaErrorDto);
            expect(result.property).toBe('possibleAreaList');
            expect(result.value).toEqual([]);
        });

        it('자격증은 포함되지 않아도 된다.', async () => {
            const licenseTestForm = plainToInstance(
                CaregiverInfoForm,
                CaregiverInfoForm.of(undefined, [])
            );

            const result = await validate(licenseTestForm);
            expect(result).toEqual([]);
        });

        it('경험 작성 문항은 정해진 문항 이외의 항목은 올 수 없다.', async () => {
            const experienceTestForm = plainToInstance(
                CaregiverThirdRegisterDto,
                CaregiverThirdRegisterDto.of({ 'unknown': '오류가 나야합니다' } as CaregiverHelpExperience)
            );

            const [result] = await validate(experienceTestForm, { whitelist: true, forbidNonWhitelisted: true })
            expect(result.property).toBe('helpExperience')
        })

        it('강점은 포함되지 않아도 된다.', async () => {
            const notExistStrenght = undefined;
            const strengthErrorTest = plainToInstance(
                CaregiverThirdRegisterDto,
                CaregiverThirdRegisterDto.of(undefined, notExistStrenght, undefined)
            );

            const result = await validate(strengthErrorTest);
            expect(result).toEqual([]);
        });

        it('태그의 개수는 3개여야 한다.', async () => {
            const errorTagList = ['태그1'];
            const tagErrorTest = plainToInstance(
                CaregiverThirdRegisterDto,
                CaregiverThirdRegisterDto.of(undefined, undefined, errorTagList)
            );

            const [errorResult] = await validate(tagErrorTest);

            expect(errorResult.property).toBe('tagList');

            const passTagList = ['태그1', '태그2', '태그3'];
            const tagPassTest = plainToInstance(
                CaregiverThirdRegisterDto,
                CaregiverThirdRegisterDto.of(undefined, undefined, passTagList )
            );

            const passResult = await validate(tagPassTest);
            expect(passResult).toEqual([]);
        });
    })
})