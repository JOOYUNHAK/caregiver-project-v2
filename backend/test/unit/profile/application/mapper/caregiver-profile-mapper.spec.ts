import { CaregiverProfileMapper } from "src/profile/application/mapper/caregiver-profile.mapper"
import { CaregiverProfile } from "src/profile/domain/entity/caregiver/caregiver-profile.entity";
import { License } from "src/profile/domain/entity/caregiver/license.entity";
import { CaregiverRegisterDto } from "src/profile/interface/dto/caregiver-register.dto";
import { CaregiverInfoForm, CaregiverLastRegisterDto, CaregiverThirdRegisterDto, CommonRegisterForm } from "src/user/interface/dto/register-page";
import { TestUser } from "test/unit/user/user.fixtures";
import { TestCaregiverProfile } from "../../profile.fixtures";
import { User } from "src/user-auth-common/domain/entity/user.entity";

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
    
    describe('toDto()', () => {
        
        it.each([
            [8, '8개월'],
            [13, '1년 1개월'],
            [12, '1년']
        ])('career(경력)이 클라이언트 화면용 값으로 변경되는지 확인', (testCareer, expectedCareer) => {
            const userStub = TestUser.default() as unknown as User;
            const profileStub = TestCaregiverProfile.default().career(testCareer).build();

            const result = profileMapper.toListDto(userStub, profileStub);
            expect(result.profile.career).toBe(expectedCareer);
        });

        it.each([
            [1, '즉시가능'],
            [2, '1주이내'],
            [5, '한달이내']
        ])('possibleDate(가능한 날짜)가 클라이언트 화면용 값으로 변경되는지 확인', (testValue, expectedDate) => {
            const userStub = TestUser.default() as unknown as User;
            const profileStub = TestCaregiverProfile.default().possibleDate(testValue).build();

            const result = profileMapper.toListDto(userStub, profileStub);
            expect(result.profile.possibleDate).toBe(expectedDate);
        });

        it.each([
            [['인천', '서울'], '인천,서울'],
            [['인천', '서울', '경기', '부산'], '상세보기참고']
        ])('possibleAreaList(가능한 지역)이 클라이언트 화면용 값으로 변경되는지 확인', (testAreaList, expectedAreaList) => {
            const userStub = TestUser.default() as unknown as User;
            const profileStub = TestCaregiverProfile.default().possibleAreaList(testAreaList).build();

            const result = profileMapper.toListDto(userStub, profileStub);
            expect(result.profile.possibleAreaList).toEqual(expectedAreaList);
        });

        it('toDto()를 수행했을 때 포함되어야 할 필드가 있는지 확인', () => {
            const userStub = TestUser.default() as unknown as User;
            const profileStub = TestCaregiverProfile.default().build();

            const result = profileMapper.toListDto(userStub, profileStub);
            
            expect(result).toHaveProperty('user');
            expect(result).toHaveProperty('profile');

            expect(result.user).toHaveProperty('name');
            expect(result.user).toHaveProperty('age');
            expect(result.user).toHaveProperty('sex');

            expect(result.profile).toHaveProperty('_id');
            expect(result.profile).toHaveProperty('userId');
            expect(result.profile).toHaveProperty('career');
            expect(result.profile).toHaveProperty('pay');
            expect(result.profile).toHaveProperty('possibleDate');
            expect(result.profile).toHaveProperty('possibleAreaList');
            expect(result.profile).toHaveProperty('tagList');
            expect(result.profile).toHaveProperty('notice');
        })
    })
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