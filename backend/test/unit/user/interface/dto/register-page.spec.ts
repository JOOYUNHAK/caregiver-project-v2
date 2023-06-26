import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { ROLE, SEX } from "src/user-auth-common/domain/enum/user.enum"
import { CommonRegisterForm, PatientHelpListForm, PatientInfoForm } from "src/user/interface/dto/register-page"

describe('보호자 회원가입의 각 양식 Dto Validator Test', () => {
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
                PatientInfoForm.of(wrongWeight, SEX.MALE, '뇌출혈', new Date(), new Date(), 1, '인천', false, '자세한' )
            );
            const [result] = await validate(testForm);

            expect(result.property).toBe('weight');
            expect(result.value).toBe(wrongWeight);
        });

        it('날짜형식은 Date타입만 통과되어야 한다', async () => {
            const wrongDate = '2022-03-03' as unknown as Date;
            const testForm = plainToInstance(
                PatientInfoForm,
                PatientInfoForm.of(50, SEX.MALE, '뇌출혈', wrongDate, new Date(), 1, '인천', false, '자세한' )
            );
            const [result] = await validate(testForm);

            expect(result.property).toBe('startPeriod');
            expect(result.value).toBe(wrongDate);
        });
    });

    describe('환자의 도움 리스트 양식(PatientHelpListForm) Test', () => {
        it('모든 문항이 채워져 있지 않아도 된다', async () => {
            const testForm = plainToInstance(
                PatientHelpListForm,
                PatientHelpListForm.of(
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
    })
})