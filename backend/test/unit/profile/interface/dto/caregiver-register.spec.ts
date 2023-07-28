import 'reflect-metadata';
import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { ROLE, SEX } from "src/user-auth-common/domain/enum/user.enum"
import { CaregiverInfoForm, CaregiverLastRegisterDto, CaregiverThirdRegisterDto, CommonRegisterForm } from "src/user/interface/dto/register-page"
import { CaregiverRegisterDto } from "src/profile/interface/dto/caregiver-register.dto"

describe('간병인 회원가입 전체 Dto Validator Test', () => {
    
    it('각 양식이 맞게 입력되면 Dto가 통과된다', async () => {
        const testForm = plainToInstance(
            CaregiverRegisterDto,
            CaregiverRegisterDto.of(
                CommonRegisterForm.of('01011111111', '테스트', 19980101, SEX.MALE, ROLE.PROTECTOR),
                CaregiverInfoForm.of(['인천', '경기'], ['응급구조사']),
                CaregiverThirdRegisterDto.of({}, ['강점1'], ['태그1', '태그2', '태그3']),
                CaregiverLastRegisterDto.of()
            )
        );

        const result = await validate(testForm);

        expect(result).toEqual([]);
    });
})