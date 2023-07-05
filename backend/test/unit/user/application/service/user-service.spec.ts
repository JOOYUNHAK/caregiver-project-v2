import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { TokenService } from "src/auth/application/service/token.service"
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity"
import { UserProfile } from "src/user-auth-common/domain/entity/user-profile.entity"
import { User } from "src/user-auth-common/domain/entity/user.entity"
import { LOGIN_TYPE, ROLE, SEX } from "src/user-auth-common/domain/enum/user.enum"
import { NewUserAuthentication } from "src/user-auth-common/domain/interface/new-user-authentication.interface"
import { UserMapper } from "src/user/application/mapper/user.mapper"
import { CaregiverProfileService } from "src/user/application/service/caregiver-profile.service"
import { PatientProfileService } from "src/user/application/service/patient-profile.service"
import { UserService } from "src/user/application/service/user.service"
import { CaregiverRegisterDto } from "src/user/interface/dto/caregiver-register.dto"
import { ProtectorRegisterDto } from "src/user/interface/dto/protector-register.dto"
import { CommonRegisterForm } from "src/user/interface/dto/register-page"
import { Repository } from "typeorm"

describe('UserService Test', () => { 
    let userService: UserService,
        userMapper: UserMapper,
        tokenService: TokenService,
        caregiverProfileService: CaregiverProfileService,
        patientProfileService: PatientProfileService,
        userRepository: Repository<User>;

    beforeAll(async() => {
        const module = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserMapper,
                    useValue: {
                        mapFrom: jest.fn().mockReturnValue(createTestUser()),
                        toDto: jest.fn()
                    }
                },
                {
                    provide: TokenService,
                    useValue: {
                        generateNewUsersToken: jest.fn().mockReturnValue(createTestAuthentication()),
                        addAccessTokenToSessionList: jest.fn().mockReturnValue(null)
                    }
                },
                {
                    provide: CaregiverProfileService,
                    useValue: {
                        addProfile: jest.fn().mockReturnValue(null)
                    }
                },
                {
                    provide: PatientProfileService,
                    useValue: {
                        addProfile: jest.fn().mockReturnValue(null)
                    }
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        save: jest.fn().mockResolvedValue(createTestUser())
                    }
                }
            ]
        }).compile();

        userService = module.get(UserService);
        userMapper = module.get(UserMapper);
        tokenService = module.get(TokenService);
        userRepository = module.get(getRepositoryToken(User));
        caregiverProfileService = module.get(CaregiverProfileService);
        patientProfileService = module.get(PatientProfileService);
    })

    describe('register()', () => {
        it('회원가입을 진행하면 인증/인가에 필요한 토큰 발급', async () => {
            const user = userMapper.mapFrom({} as CommonRegisterForm);
            const authentication = await tokenService.generateNewUsersToken(user);
            user.setAuthentication(authentication);

            expect(await user.getAuthentication()).toHaveProperty('accessToken');
            expect((await user.getAuthentication()).getAccessToken()).toBe('testAccessToken');
            
            expect(await user.getAuthentication()).toHaveProperty('refreshToken');
        });

        it('회원가입을 진행했을 때 DB저장, 세션추가 함수 호출', async () => {
            const [saveSpay, sessionSpy] = [
                jest.spyOn(userRepository, 'save'),
                jest.spyOn(tokenService, 'addAccessTokenToSessionList')
            ];
            const testRegisterDto = { firstRegister: { purpose: ROLE.CAREGIVER } };
            await userService.register(testRegisterDto as CaregiverRegisterDto);

            expect(saveSpay).toHaveBeenCalled();
            expect(sessionSpy).toHaveBeenCalled();
        });

        it('간병인 회원가입 진행할 때 간병인 프로필 추가 함수 호출', async () => {
            const profileSpy = jest.spyOn(caregiverProfileService, 'addProfile');

            const testCaregiverRegisterDto = { firstRegister: { purpose: ROLE.CAREGIVER } };
            await userService.register(testCaregiverRegisterDto as CaregiverRegisterDto);

            expect(profileSpy).toHaveBeenCalled();
        });
        
        it('보호자 회원가입 진행할 때 환자 프로필 추가 함수 호출', async () => {
            const profileSpy = jest.spyOn(patientProfileService, 'addProfile');

            const testCaregiverRegisterDto = { firstRegister: { purpose: ROLE.PROTECTOR } };
            await userService.register(testCaregiverRegisterDto as ProtectorRegisterDto);

            expect(profileSpy).toHaveBeenCalled();
        });
    })
})

function createTestUser(): User {
    return new User(
        '테스트',
        ROLE.CAREGIVER,
        LOGIN_TYPE.PHONE,
        null,
        new Phone('01011111111'),
        new UserProfile(19990101, SEX.MALE),
        null
    );
};

function createTestAuthentication(): NewUserAuthentication {
    return {
        accessToken: 'testAccessToken',
        refreshToken: 'testRefreshToken'
    }
};

