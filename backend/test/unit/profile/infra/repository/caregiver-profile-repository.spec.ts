import { ConfigModule, ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { ObjectId } from "mongodb";
import { CaregiverProfileBuilder } from "src/profile/domain/builder/profile.builder";
import { CaregiverProfile } from "src/profile/domain/entity/caregiver/caregiver-profile.entity";
import { License } from "src/profile/domain/entity/caregiver/license.entity";
import { PossibleDate } from "src/profile/domain/enum/possible-date.enum";
import { CaregiverProfileRepository } from "src/profile/infra/repository/caregiver-profile.repository";
import { ConnectMongoDB, DisconnectMongoDB, getMongodb } from "test/unit/common/database/datebase-setup.fixture";

describe('간병인 프로필정보 저장소(CaregiverProfileRepository) Test', () => {
    let testProfile: CaregiverProfile, 
        caregiverProfileRepository: CaregiverProfileRepository;
    
    beforeAll(async () => {
        await ConnectMongoDB();

        const module = await Test.createTestingModule({
            imports: [
                ConfigModule
            ],
            providers: [
                {
                    provide: 'MONGO_CONNECTION',
                    useValue: getMongodb()
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('test')                        
                    }
                },
                CaregiverProfileRepository
            ]
        }).compile()
        caregiverProfileRepository = module.get(CaregiverProfileRepository);
    });

    afterAll(async () => await DisconnectMongoDB());

    it('save() => 빈 배열을 가지는 필드는 DB에 []로 저장.', async () => {

        testProfile = createCommonCaregiverProfile()
                        .helpExperience({ suction: '석션입니다' })
                        .licenseList([])
                        .strengthList([])
                        .warningList([])
                        .build()

        await caregiverProfileRepository.save(testProfile);
        const savedProfile = await caregiverProfileRepository.findById(testProfile.getId());

        expect(savedProfile.getLicenseList()).toEqual([]);
        expect(savedProfile.getStrengthList()).toEqual([]);
        expect(savedProfile.getWarningList()).toEqual([]);

        await caregiverProfileRepository.delete(testProfile.getId());
    });

    it('save() => 간병 경험이 비어있으면 DB에 {}로 저장', async () => {
        testProfile = createCommonCaregiverProfile()
                        .helpExperience({})
                        .licenseList([new License('자격증', false)])
                        .strengthList(['강점'])
                        .warningList(null)
                        .build()

        await caregiverProfileRepository.save(testProfile);
        const savedProfile = await caregiverProfileRepository.findById(testProfile.getId());

        expect(savedProfile.getHelpExperience()).toEqual({});

        await caregiverProfileRepository.delete(testProfile.getId());
    });

    it('findByUserId() => 일치하는 문서 반환 확인', async() => {
        testProfile = createCommonCaregiverProfile()
                        .helpExperience({ suction: '석션입니다' })
                        .licenseList([])
                        .strengthList([])
                        .warningList([])
                        .build();

        await caregiverProfileRepository.save(testProfile);
        const findResult = await caregiverProfileRepository.findByUserId(1);

        expect(findResult.getUserId()).toBe(1);

        await caregiverProfileRepository.delete(testProfile.getId());
    })

    it('delete() => 삭제이후 해당 문서는 존재하면 안된다.', async () => {

        testProfile = createCommonCaregiverProfile()
                        .helpExperience({ suction: '석션입니다' })
                        .licenseList([])
                        .strengthList([])
                        .warningList([])
                        .build()

        await caregiverProfileRepository.save(testProfile);

        const beforeDeleteResult = await caregiverProfileRepository.findById(testProfile.getId());
        expect(beforeDeleteResult).not.toBeNull();

        const afterDeleteResult = await caregiverProfileRepository.delete(testProfile.getId());
        expect(afterDeleteResult).toBeUndefined();
    });
})

function createCommonCaregiverProfile() {
    return new CaregiverProfileBuilder(new ObjectId())
        .userId(1)
        .weight(50)
        .career(10)
        .pay(10)
        .possibleDate(PossibleDate.IMMEDATELY)
        .possibleAreaList(['인천', '서욿'])
        .nextHosptial('다음 병원 여부')
        .tagList(['태그1', '태그2', '태그3'])
        .notice('공지사항을 알려드립니다')
        .isPrivate(false)
        .additionalChargeCase('추가요금이 붙는 상황')
};