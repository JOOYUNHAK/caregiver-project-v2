import { CaregiverProfileMapper } from "src/profile/application/mapper/caregiver-profile.mapper"
import { CaregiverProfile } from "src/profile/domain/entity/caregiver/caregiver-profile.entity";
import { License } from "src/profile/domain/entity/caregiver/license.entity";
import { CaregiverRegisterDto } from "src/profile/interface/dto/caregiver-register.dto";
import { CaregiverInfoForm, CaregiverLastRegisterDto, CaregiverThirdRegisterDto, CommonRegisterForm } from "src/user/interface/dto/register-page";
import { TestUser } from "test/unit/user/user.fixtures";
import { TestCaregiverProfile } from "../../profile.fixtures";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { ProfileFilter } from "src/profile/domain/profile-filter";
import { GetProfileListDto } from "src/profile/interface/dto/get-profile-list.dto";
import { ProfileListCursor } from "src/profile/domain/profile-list.cursor";
import { ProfilePaySort, ProfileSort } from "src/profile/domain/profile-sort";
import { SEX } from "src/user-auth-common/domain/enum/user.enum";
import { UserProfile } from "src/user-auth-common/domain/entity/user-profile.entity";
import { CaregiverProfileListData } from "src/profile/domain/profile-list-data";
import { ProfileLikeMetadata } from "src/profile/domain/profile-like-metadata";
import { OrderBy } from "src/common/shared/enum/sort-order.enum";

describe('Caregiver Profile Mapper Component Test', () => {
    const profileMapper = new CaregiverProfileMapper();

    describe('mapFrom()', () => {
        const [userId, name, birth, sex, expectedAge] = [1, '테스트', 19980303, SEX.MALE, 25];
        const user = TestUser
                    .default()
                    .withId(userId)
                    .withName(name)
                    .withUserProfile(new UserProfile(birth, sex)) as unknown as User;

        it('간병인 회원가입 양식으로부터 프로필로 변환', () => {
            const mappingResult = profileMapper.mapFrom(user, CaregiverRegisterDto.of(
                {} as CommonRegisterForm,
                createSecondRegisterForm(),
                createThirdRegisterForm(),
                createlastRegisterForm()
            ));

            expect(mappingResult).toBeInstanceOf(CaregiverProfile);
            expect(mappingResult.getId()).not.toBeNull();
            expect(mappingResult.getUserId()).toBe(userId);
            expect(mappingResult.getAge()).toBe(expectedAge);
            expect(mappingResult.getSex()).toBe(sex);

            mappingResult.getLicenseList()
                .map(license => {
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

    describe('toListQueryOptions()', () => {
        it('Cursor, Sort, Filter에 맞게 인스턴스가 생성되는지 확인', () => {
            const sort = new ProfilePaySort(OrderBy.ASC);
            const filter = new ProfileFilter();
            const getProfileListDto = GetProfileListDto.of(filter, sort);

            const mappingResult = profileMapper.toListQueryOptions(getProfileListDto);

            expect(mappingResult.getNextCursor()).toBeInstanceOf(ProfileListCursor);
            expect(mappingResult.getSortOptions()).toBeInstanceOf(ProfileSort);
            expect(mappingResult.getFilters()).toBeInstanceOf(ProfileFilter);
        })
    })

    describe('toListDto()', () => {

        it.each([
            [8, '8개월'],
            [13, '1년 1개월'],
            [12, '1년']
        ])('career(경력)이 클라이언트 화면용 값으로 변경되는지 확인', (testCareer, expectedCareer) => {
            const profileStub = TestCaregiverProfile.default().career(testCareer).build() as unknown as CaregiverProfileListData;

            const result = profileMapper.toListDto(profileStub);
            expect(result.career).toBe(expectedCareer);
        });

        it.each([
            [1, '즉시가능'],
            [2, '1주이내'],
            [5, '한달이내']
        ])('possibleDate(가능한 날짜)가 클라이언트 화면용 값으로 변경되는지 확인', (testValue, expectedDate) => {
            const profileStub = TestCaregiverProfile.default().possibleDate(testValue).build() as unknown as CaregiverProfileListData;

            const result = profileMapper.toListDto(profileStub);
            expect(result.possibleDate).toBe(expectedDate);
        });

        it.each([
            [['인천', '서울'], '인천,서울'],
            [['인천', '서울', '경기', '부산'], '상세보기참고']
        ])('possibleAreaList(가능한 지역)이 클라이언트 화면용 값으로 변경되는지 확인', (testAreaList, expectedAreaList) => {
            const profileStub = TestCaregiverProfile.default().possibleAreaList(testAreaList).build() as unknown as CaregiverProfileListData;

            const result = profileMapper.toListDto(profileStub);
            expect(result.possibleAreaList).toEqual(expectedAreaList);
        });

        it('toListDto()를 수행했을 때 포함되어야 할 필드가 있는지 확인', () => {
            const profileStub = TestCaregiverProfile.default().build() as unknown as CaregiverProfileListData;

            const result = profileMapper.toListDto(profileStub);

            expect(result).toHaveProperty('name');
            expect(result).toHaveProperty('age');
            expect(result).toHaveProperty('sex');

            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('userId');
            expect(result).toHaveProperty('career');
            expect(result).toHaveProperty('pay');
            expect(result).toHaveProperty('possibleDate');
            expect(result).toHaveProperty('possibleAreaList');
            expect(result).toHaveProperty('tagList');
            expect(result).toHaveProperty('notice');
        })
    });

    describe('toDetailDto()', () => {
        let likeMetadataStub: ProfileLikeMetadata;

        beforeAll(() => likeMetadataStub = new ProfileLikeMetadata(10, null));

        it('가능한 지역을 상세페이지에선 모두 나열해주는지 확인', () => {
            const possibleAreaList = ['인천', '서울', '부산', '대구', '포항'];
            const expectedArea = '인천,서울,부산,대구,포항';

            const profileStub = TestCaregiverProfile.default().possibleAreaList(possibleAreaList).build();

            const result = profileMapper.toDetailDto(profileStub, likeMetadataStub);

            expect(result.profile.possibleAreaList).toBe(expectedArea);
        });

        it('자격증이 없는 사용자는 빈 배열로 반환되어야 한다', () => {
            const emptyLicenseList = [];
            const profileStub = TestCaregiverProfile.default().licenseList(emptyLicenseList).build();

            const result = profileMapper.toDetailDto(profileStub, likeMetadataStub);
            
            expect(result.profile.licenseList).toEqual(emptyLicenseList);
        })

        it('인증이 완료된 자격증의 이름은 포함되고, 완료되지 않은 자격증은 포함되지 않는지 확인', () => {
            const [unCertificatedLicense, certificatedLicense] = ['자격증1', '자격증2'];
            const licenseList = [new License(unCertificatedLicense, false), new License(certificatedLicense, true)];
            const expectedLicense = [certificatedLicense];

            const profileStub = TestCaregiverProfile.default().licenseList(licenseList).build();

            const result = profileMapper.toDetailDto(profileStub, likeMetadataStub);

            expect(result.profile.licenseList).toEqual(expectedLicense);
        })

        it('toDetailDto()를 수행했을 때 포함되어야 할 필드가 있는지 확인', () => {
            const profileStub = TestCaregiverProfile.default().build();

            const result = profileMapper.toDetailDto(profileStub, likeMetadataStub);
            
            expect(result.user).toHaveProperty('id');
            expect(result.user).toHaveProperty('name');
            expect(result.user).toHaveProperty('sex');
            expect(result.user).toHaveProperty('age');

            expect(result.profile).toHaveProperty('id');
            expect(result.profile).toHaveProperty('career');
            expect(result.profile).toHaveProperty('pay');
            expect(result.profile).toHaveProperty('possibleDate');
            expect(result.profile).toHaveProperty('possibleAreaList');
            expect(result.profile).toHaveProperty('notice');
            expect(result.profile).toHaveProperty('licenseList');
            expect(result.profile).toHaveProperty('additionalChargeCase');
            expect(result.profile).toHaveProperty('nextHosptial');
            expect(result.profile).toHaveProperty('helpExperience');
            expect(result.profile).toHaveProperty('strengthList');
            expect(result.profile).toHaveProperty('warningList');
            expect(result.profile.likeMetadata).toHaveProperty('count');
            expect(result.profile.likeMetadata).toHaveProperty('isLiked');
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