import { ObjectId } from "mongodb";
import { Token } from "src/user-auth-common/domain/entity/auth-token.entity";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { ROLE, SEX } from "src/user-auth-common/domain/enum/user.enum";
import { UserMapper } from "src/user/application/mapper/user.mapper"
import { CaregiverProfileBuilder } from "src/user/domain/builder/profile.builder";
import { CommonRegisterForm } from "src/user/interface/dto/register-page";
import { TestUser } from "../../user.fixtures";

describe('UserMapper Component Test', () => {
    const userMapper = new UserMapper();

    describe('mapFrom()', () => {
        it('공통회원가입 양식을 User 객체로 Mapping', async () => {
            const testCommonRegisterForm = CommonRegisterForm.of(
                '01011111111',
                '테스트',
                19991101,
                SEX.FEMALE,
                ROLE.CAREGIVER
            );

            const mapResult = userMapper.mapFrom(testCommonRegisterForm);

            expect(mapResult).toBeInstanceOf(User);
            expect(mapResult).toHaveProperty('name');
            expect(mapResult).toHaveProperty('role');
            expect(mapResult).toHaveProperty('loginType');
            expect(mapResult).toHaveProperty('email');
            expect(mapResult).toHaveProperty('phone');
            expect(mapResult).toHaveProperty('profile');
            expect(mapResult).toHaveProperty('authentication');
        });
    });

    describe('toMyProfileDto()', () => {
        describe('내 정보 조회시 간병인 보호자 공통', () => {
            it('이메일을 등록하지 않은 사용자면 null 설정된다', async() => {
                const phoneNumber = '01011111111';
                const testUser = TestUser.default().withPhoneNumber(phoneNumber);

                const result = await userMapper.toMyProfileDto(testUser as unknown as User);

                expect(result.phoneNumber).toBe(phoneNumber);
                expect(result.email).toBe(null);
            });

            it('이메일을 등록한 사용자면 해당 이메일이 설정', async() => {
                const email = 'test@naver.com';
                const testUser = TestUser.default().withEmail(email);
                const result = await userMapper.toMyProfileDto(testUser as unknown as User);

                expect(result.email).toBe(email);
            })
        });

        describe('내 정보 조회시 간병인', () => {
            it('간병인의 결과에는 프로필 비공개여부 필드가 있어야 한다', async() => {
                const phoneNumber = '01012341234';
                const testUser = TestUser.default()
                                        .withRole(ROLE.CAREGIVER)
                                        .withPhoneNumber(phoneNumber);

                const testProfile = new CaregiverProfileBuilder(new ObjectId())
                                        .isPrivate(false)
                                        .build();

                const result = await userMapper.toMyProfileDto(testUser as unknown as User, testProfile);

                expect(result.phoneNumber).toBe(phoneNumber);
                expect(result.email).toBe(null);
                expect(result.role).toBe(ROLE.CAREGIVER);
                expect(result.isPrivate).toBe(false);
            })
        })
    })

    describe('toDto()', () => {
        it('User 객체에서 사용자에게 넘겨줄 Dto Mapping', async () => {
            const [accessToken, refreshKey] = ['accessToken', 'refreshKey'];
            const token = new Token(accessToken, refreshKey, null);

            const testUser = TestUser.default().withToken(token);

            const mapResult = userMapper.toDto(testUser as unknown as User);

            expect(mapResult).toHaveProperty('refreshKey');
            expect(mapResult).toHaveProperty('name');
            expect(mapResult).toHaveProperty('accessToken');
            expect(mapResult.accessToken).toBe(accessToken);
            expect(mapResult.refreshKey).toBe(refreshKey);
            expect(mapResult.name).toBe(testUser.getName());
        })
    })
});