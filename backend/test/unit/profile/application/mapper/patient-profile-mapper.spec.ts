import { PatientProfileMapper } from "src/profile/application/mapper/patient-profile.mapper";
import { PatientProfile } from "src/profile/domain/entity/protector/patient-profile.entity";
import { ProtectorRegisterDto } from "src/profile/interface/dto/protector-register.dto";
import { CommonRegisterForm, PatientInfoForm } from "src/user/interface/dto/register-page";

describe('Patient Profile Mapper Component Test', () => {
    const profileMapper = new PatientProfileMapper();
    const userId = 1;

    describe('mapFrom()', () => {
        it('보호자 회원가입 양식으로부터 환자 프로필로 변환', () => {
            const mappingResult = profileMapper.mapFrom(userId, ProtectorRegisterDto.of(
                {} as CommonRegisterForm,
                createPatientInfo(),
                { suction: '석션', 'badChair': '휠체어' }
            ));

            expect(mappingResult).toBeInstanceOf(PatientProfile);
            expect(mappingResult.getId()).not.toBeNull();
            expect(mappingResult.getUserId()).toBe(userId);

            expect(mappingResult.getCarePeriod().getStartDate().toISOString()).toEqual(new Date('2023-01-01').toISOString());
            expect(mappingResult.getCarePeriod().getEndDate().toISOString()).toEqual(new Date('2023-01-05').toISOString());
            expect(mappingResult.getCarePeriod().getTotalDay()).toBe(6);

            expect(mappingResult.getHelpList()).toHaveProperty('suction');
            expect(mappingResult.getHelpList()).toHaveProperty('badChair');
        })
    });
    
})

function createPatientInfo(): PatientInfoForm {
    return PatientInfoForm.of(
        new Date('2023-01-01'),
        new Date('2023-01-05'),
        6
    );
};