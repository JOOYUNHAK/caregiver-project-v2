import { ObjectId } from "mongodb";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { ROLE, SEX } from "src/user-auth-common/domain/enum/user.enum";
import { UserMapper } from "src/user/application/mapper/user.mapper"
import { CaregiverProfileBuilder } from "src/profile/domain/builder/profile.builder";
import { CommonRegisterForm } from "src/user/interface/dto/register-page";
import { UserFixtures } from "../../user.fixtures";

describe('UserMapper Component Test', () => {
    const userMapper = new UserMapper();

    describe('mapFrom()', () => {
        it('공통회원가입 양식을 User 객체로 Mapping', async () => {
            const [phoneNumber, name, birth, sex, role] = ['01011111111', '테스트', 19980101, SEX.FEMALE, ROLE.CAREGIVER];
            const testCommonRegisterForm = CommonRegisterForm.of(phoneNumber, name, birth, sex, role);

            const mapResult = userMapper.mapFrom(testCommonRegisterForm);

            expect(mapResult).toBeInstanceOf(User);
            
            expect((await mapResult.getPhone()).getPhoneNumber()).toBe(phoneNumber);
            expect(mapResult.getEmail()).toBeInstanceOf(Promise);
            expect(mapResult.getName()).toBe(name);
            expect(mapResult.getRole()).toBe(role);
            expect((await mapResult.getProfile()).getBirth()).toBe(birth);
            expect((await mapResult.getProfile()).getSex()).toBe(sex);
            expect(mapResult.getAuthentication()).toBe(undefined);
        });
    });

    describe('toMyProfileDto()', () => {
        describe('내 정보 조회시 간병인 보호자 공통', () => {
            it('이메일을 등록하지 않은 사용자면 null 설정된다', async() => {
                const phoneNumber = '01011111111';
                const testUser = UserFixtures.createWithPhone(phoneNumber);

                const result = await userMapper.toMyProfileDto(testUser);

                expect(result.phoneNumber).toBe(phoneNumber);
                expect(result.email).toBe(null);
            });

            it('이메일을 등록한 사용자면 해당 이메일이 설정', async() => {
                const email = 'test@naver.com';
                const testUser = UserFixtures.createWithEmail(email);

                const result = await userMapper.toMyProfileDto(testUser);

                expect(result.email).toBe(email);
            })
        });

        describe('내 정보 조회시 간병인', () => {
            it('간병인의 결과에는 프로필 비공개여부 필드가 있는지 확인', async() => {
                const testUser = UserFixtures.createWithRole(ROLE.CAREGIVER);

                const testProfile = new CaregiverProfileBuilder(new ObjectId())
                                        .isPrivate(false)
                                        .build();

                const result = await userMapper.toMyProfileDto(testUser, testProfile);

                expect(result.phoneNumber).toBe((await testUser.getPhone()).getPhoneNumber());
                expect(result.email).toBe(null);
                expect(result.role).toBe(ROLE.CAREGIVER);
                expect(result.isPrivate).toBe(false);
            })
        })
    })

    describe('toDto()', () => {
        it('User 객체에서 사용자에게 넘겨줄 Dto Mapping 확인', async () => {
            const testUser = UserFixtures.createDefault();

            const mapResult = userMapper.toDto(testUser);

            expect(mapResult).toHaveProperty('refreshKey');
            expect(mapResult).toHaveProperty('name');
            expect(mapResult).toHaveProperty('accessToken');

            expect(mapResult.accessToken).toBe(testUser.getAuthentication().getAccessToken());
            expect(mapResult.refreshKey).toBe(testUser.getAuthentication().getRefreshKey());
            expect(mapResult.name).toBe(testUser.getName());
        })
    })
});