import { CaregiverProfileMapper } from "src/user/application/mapper/caregiver-profile.mapper"
import { CaregiverProfile } from "src/user/domain/entity/caregiver/caregiver-profile.entity";
import { License } from "src/user/domain/entity/caregiver/license.entity";
import { CaregiverRegisterDto } from "src/user/interface/dto/caregiver-register.dto";
import { CaregiverInfoForm, CaregiverLastRegisterDto, CaregiverThirdRegisterDto, CommonRegisterForm } from "src/user/interface/dto/register-page";

describe('Caregiver Profile Mapper Component Test', () => {
    const profileMapper = new CaregiverProfileMapper();
    const userId = 1;

    describe('mapFrom()', () => {
        it('간병인 회원가입 양식으로부터 프로필로 변환', () => {
            const mappingResult = profileMapper.mapFrom(userId, CaregiverRegisterDto.of(
                {} as CommonRegisterForm,
                createSecondRegisterForm(),
                createThirdRegisterForm(),
                createlastRegisterForm()
            ));

            expect(mappingResult).toBeInstanceOf(CaregiverProfile);
            expect(mappingResult.getId()).not.toBeNull();
            expect(mappingResult.getUserId()).toBe(userId);

            mappingResult.getLicenseList()
                .map( license => {
                    expect(license).toBeInstanceOf(License);
                    expect(license.getName()).toBe('자격증');
                    expect(license.getIsCertified()).toBe(false);
                });

            expect(mappingResult.getStrengthList()).toEqual([]);
            expect(mappingResult.getHelpExperience()).toHaveProperty('suction');
            expect(mappingResult.getHelpExperience()).toHaveProperty('movement');
            expect(mappingResult.getHelpExperience()).not.toHaveProperty('meal');
            expect(mappingResult.getIsPrivate()).toBe(false);
            expect(mappingResult.getWarningList()).toEqual([]);
        })
    });
    
})

function createSecondRegisterForm(): CaregiverInfoForm {
    return CaregiverInfoForm.of(
        ['지역1', '지역2'],
        ['자격증'],
    );
};

function createThirdRegisterForm(): CaregiverThirdRegisterDto {
    return CaregiverThirdRegisterDto.of(
        { suction: '석션', movement: '거동' },
        [],
        ['태그1', '태그2', '태그3']
    );
};

function createlastRegisterForm(): CaregiverLastRegisterDto {
    return CaregiverLastRegisterDto.of();
}