import { Token } from "src/user-auth-common/domain/entity/auth-token.entity";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { LOGIN_TYPE, ROLE, SEX } from "src/user-auth-common/domain/enum/user.enum";
import { UserMapper } from "src/user/application/mapper/user.mapper"
import { CommonRegisterForm } from "src/user/interface/dto/register-page";

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

    describe('toDto()', () => {
        it('User 객체에서 사용자에게 넘겨줄 Dto Mapping', async () => {
            const testUser = new User(
                '테스트',
                ROLE.CAREGIVER,
                LOGIN_TYPE.PHONE,
                null,
                null,
                null,
                new Token(null, null)
            );

            const mapResult = await userMapper.toDto(testUser);

            expect(mapResult).toHaveProperty('id');
            expect(mapResult).toHaveProperty('name');
            expect(mapResult).toHaveProperty('accessToken')
        })
    })
});