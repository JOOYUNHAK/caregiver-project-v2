import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm";
import { TokenService } from "src/auth/application/service/token.service";
import { Email } from "src/user-auth-common/domain/entity/user-email.entity";
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { LOGIN_TYPE, ROLE, SEX } from "src/user-auth-common/domain/enum/user.enum";
import { ProtectorMapper } from "src/user/application/mapper/protector.mapper";
import { CarePeriod } from "src/user/domain/entity/protector/care-period.entity";
import { Patient } from "src/user/domain/entity/protector/patient.entity";
import { Protector } from "src/user/domain/entity/protector/protector.entity";
import { ProtectorRegisterDto } from "src/user/interface/dto/protector-register.dto";
import { CommonRegisterForm, PatientHelpListForm, PatientInfoForm } from "src/user/interface/dto/register-page";

describe('회원가입 서비스(RegisterService) Test', () => {
    let tokenService: TokenService;
    let protectorMapper: ProtectorMapper;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: ProtectorMapper,
                    useValue: { 
                        mapFrom: jest.fn((registerDto: ProtectorRegisterDto) => protectorStub) 
                    }
                },
                {
                    provide: TokenService,
                    useValue: {
                        generateNewUsersToken: jest.fn((user: User) => ({
                            accessToken: 'accessToken', refreshToken: 'refreshToken'
                        }))
                    }
                },
                {
                    provide: getRepositoryToken(Protector),
                    useValue: { save: jest.fn() }
                }
            ]
        }).compile();

        tokenService = module.get(TokenService);
        protectorMapper = module.get(ProtectorMapper);
    })

    describe('registerAsProtector()', () => {
        it('회원가입을 하면 새로운 인증을 얻어야 한다.', async () => {
            const protector = protectorMapper.mapFrom(protectorRegisterDtoStub);
            const authentication = await tokenService.generateNewUsersToken(protector.getUser());
            protector.setAuthentication(authentication);

            expect(await protector.getUser().getAuthentication()).toHaveProperty('accessToken');
            expect(await protector.getUser().getAuthentication()).toHaveProperty('refreshToken');
        });
    })
})

const protectorRegisterDtoStub = {
    firstRegister: CommonRegisterForm.of(
        '01011111111',
        '테스트',
        19980319,
        SEX.MALE,
        ROLE.PROTECTOR
    ),
    secondRegister: PatientInfoForm.of(
        60,
        SEX.MALE,
        '뇌출혈',
        new Date('2023-01-12'),
        new Date('2023-01-15'),
        3,
        '인천',
        false,
        '자세한 몸상태'
    ),
    lastRegister: PatientHelpListForm.of(
        null,
        null,
        '거동 불편',
        '식사 불편',
        null,
        null
    )
};

const protectorStub =
    new Protector(
        new User(
            '테스트',
            ROLE.PROTECTOR,
            LOGIN_TYPE.PHONE,
            new Email(),
            new Phone('01011111111'),
            null,
            null
        ),
        new Patient(
            64,
            SEX.MALE,
            '뇌출혈',
            '인천',
            new CarePeriod(
                new Date('2023-01-12'),
                new Date('2023-01-15'),
                3
            ),
            false,
            '자세한 몸상태',
            null
        )
    )