import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { ObjectId } from "mongodb"
import { AuthService } from "src/auth/application/service/auth.service"
import { User } from "src/user-auth-common/domain/entity/user.entity"
import { ROLE } from "src/user-auth-common/domain/enum/user.enum"
import { UserMapper } from "src/user/application/mapper/user.mapper"
import { CaregiverProfileService } from "src/profile/application/service/caregiver-profile.service"
import { PatientProfileService } from "src/profile/application/service/patient-profile.service"
import { UserService } from "src/user/application/service/user.service"
import { CaregiverProfileBuilder } from "src/profile/domain/builder/profile.builder"
import { CaregiverRegisterDto } from "src/profile/interface/dto/caregiver-register.dto"
import { ProtectorRegisterDto } from "src/profile/interface/dto/protector-register.dto"
import { MockAuthService } from "test/unit/__mock__/auth/service.mock"
import { MockUserRepository } from "test/unit/__mock__/user-auth-common/repository.mock"
import { MockUserMapper } from "test/unit/__mock__/user/service.mock"
import { Repository } from "typeorm"
import { MockCaregiverProfileService, MockPatientProfileService } from "test/unit/__mock__/profile/service.mock"
import { UserFixtures } from "../../user.fixtures"

describe('UserService Test', () => { 
    let userService: UserService,
        userMapper: UserMapper,
        authService: AuthService,
        caregiverProfileService: CaregiverProfileService,
        patientProfileService: PatientProfileService,
        userRepository: Repository<User>;

    beforeAll(async() => {
        const module = await Test.createTestingModule({
            providers: [
                UserService,
                MockUserMapper,
                MockCaregiverProfileService,
                MockPatientProfileService,
                MockAuthService,
                MockUserRepository
            ]
        }).compile();

        userService = module.get(UserService);
        userMapper = module.get(UserMapper);
        authService = module.get(AuthService);
        userRepository = module.get(getRepositoryToken(User));
        caregiverProfileService = module.get(CaregiverProfileService);
        patientProfileService = module.get(PatientProfileService);
    })

    describe('register()', () => {
        it('간병인 회원가입 확인', async () => {
            const caregiverUser = UserFixtures.createWithRole(ROLE.CAREGIVER) // Db 저장 전 user
            jest.spyOn(userMapper, 'mapFrom').mockReturnValueOnce(caregiverUser);

            jest.spyOn(userRepository, 'save').mockResolvedValueOnce(caregiverUser);

            jest.spyOn(caregiverProfileService, 'addProfile').mockResolvedValueOnce(null);

            const clientDto = { name: '테스트', accessToken: 'access', refreshKey: 'refreshKey' };
            jest.spyOn(authService, 'createAuthentication').mockResolvedValueOnce(clientDto);

            const registerDto = { firstRegister: { purpose: ROLE.CAREGIVER } } as CaregiverRegisterDto;
            const result = await userService.register(registerDto);

            expect(userRepository.save).toBeCalledWith(caregiverUser); // 먼저 계정 DB 호출
            expect(caregiverProfileService.addProfile).toBeCalledWith(caregiverUser, registerDto); // 간병인 프로필 저장 호출
            expect(result).toEqual(clientDto); // return 결과
        });

        it('보호자 회원가입 확인', async () => {
            const protectorUser = UserFixtures.createWithRole(ROLE.PROTECTOR) 
            jest.spyOn(userMapper, 'mapFrom').mockReturnValueOnce(protectorUser);

            jest.spyOn(userRepository, 'save').mockResolvedValueOnce(protectorUser);

            jest.spyOn(patientProfileService, 'addProfile').mockResolvedValueOnce(null);

            const clientDto = { name: '테스트', accessToken: 'access', refreshKey: 'refreshKey' };
            jest.spyOn(authService, 'createAuthentication').mockResolvedValueOnce(clientDto);

            const registerDto = { firstRegister: { purpose: ROLE.PROTECTOR } } as ProtectorRegisterDto;
            const result = await userService.register(registerDto);

            expect(userRepository.save).toBeCalledWith(protectorUser); // 먼저 계정 DB 호출
            expect(patientProfileService.addProfile).toBeCalledWith(protectorUser.getId(), registerDto); // 보호자 프로필 저장 호출
            expect(result).toEqual(clientDto); // return 결과
        });
    })

    describe('getMyProfile()', () => {

        afterEach(() => jest.resetAllMocks() );
        
        it('간병인이 내 프로필 조회시 자격증과 비공개 여부를 위해 repository를 호출하고 mapper에 profile도 같이 넘겨주어야 한다.', async () => {
            const caregiver = UserFixtures.createWithRole(ROLE.CAREGIVER);

            const profile = new CaregiverProfileBuilder(new ObjectId()).isPrivate(true).build();

            const repositorySpy = jest.spyOn(caregiverProfileService, 'getProfileByUserId').mockResolvedValueOnce(profile);
            const mapperSpy = jest.spyOn(userMapper, 'toMyProfileDto');
            
            await userService.getMyProfile(caregiver);

            expect(repositorySpy).toBeCalledTimes(1);
            expect(mapperSpy).toBeCalledWith(caregiver, profile)
        });

        it('보호자가 내 프로필 조회시 profile을 조회하지 않고 넘어온 User만 mapper에 넘겨준다', async () => {
            const protector = UserFixtures.createWithRole(ROLE.PROTECTOR);

            const repositorySpy = jest.spyOn(caregiverProfileService, 'getProfileByUserId')
            const mapperSpy = jest.spyOn(userMapper, 'toMyProfileDto');
            
            await userService.getMyProfile(protector);

            expect(repositorySpy).toBeCalledTimes(0);
            expect(mapperSpy).toBeCalledWith(protector, undefined)
        })
    })
})

