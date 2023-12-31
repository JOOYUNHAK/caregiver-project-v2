import 'reflect-metadata';
import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { ROLE, SEX } from "src/user-auth-common/domain/enum/user.enum"
import { ProtectorRegisterDto } from "src/profile/interface/dto/protector-register.dto"
import { CommonRegisterForm, PatientHelpList, PatientInfoForm } from "src/user/interface/dto/register-page"

describe('보호자 회원가입 전체 Dto Validator Test', () => {
    
    it('각 양식이 맞게 입력되면 Dto가 통과된다', async () => {
        const testForm = plainToInstance(
            ProtectorRegisterDto,
            ProtectorRegisterDto.of(
                CommonRegisterForm.of('01011111111', '테스트', 19980101, SEX.MALE, ROLE.PROTECTOR),
                PatientInfoForm.of(new Date(), new Date(), 1),
                PatientHelpList.of(undefined,'용변', undefined, undefined, undefined, '휠체어')
            )
        );

        const result = await validate(testForm);

        expect(result).toEqual([]);
    });
})