import { ConfigModule, ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { AggregationCursor, ObjectId } from "mongodb";
import { CaregiverProfile } from "src/profile/domain/entity/caregiver/caregiver-profile.entity";
import { CaregiverProfileRepository } from "src/profile/infra/repository/caregiver-profile.repository";
import { ConnectMongoDB, DisconnectMongoDB, getMongodb } from "test/unit/common/database/datebase-setup.fixture";
import { TestCaregiverProfile } from "../../profile.fixtures";

describe('간병인 프로필정보 저장소(CaregiverProfileRepository) Test', () => {
    let testProfile: CaregiverProfile, 
        caregiverProfileRepository: CaregiverProfileRepository;
    
    const testCollectionName = 'test';

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
                        get: jest.fn().mockReturnValue(testCollectionName)                        
                    }
                },
                CaregiverProfileRepository
            ]
        }).compile()
        caregiverProfileRepository = module.get(CaregiverProfileRepository);
    });

    afterAll(async () => await DisconnectMongoDB());

    it('save() => 빈 배열을 가지는 필드는 DB에 []로 저장.', async () => {

        testProfile = TestCaregiverProfile
                        .default()
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
        testProfile = TestCaregiverProfile.default().helpExperience({}).build()

        await caregiverProfileRepository.save(testProfile);
        const savedProfile = await caregiverProfileRepository.findById(testProfile.getId());

        expect(savedProfile.getHelpExperience()).toEqual({});

        await caregiverProfileRepository.delete(testProfile.getId());
    });

    it('findByUserId() => 일치하는 문서 반환 확인', async() => {
        const userId = 100;
        testProfile = TestCaregiverProfile.default().userId(userId).build();

        await caregiverProfileRepository.save(testProfile);
        const findResult = await caregiverProfileRepository.findByUserId(userId);

        expect(findResult.getUserId()).toBe(userId);

        await caregiverProfileRepository.delete(testProfile.getId());
    })

    it('delete() => 삭제이후 해당 문서는 존재하면 안된다.', async () => {

        testProfile = TestCaregiverProfile.default().build();

        await caregiverProfileRepository.save(testProfile);

        const beforeDeleteResult = await caregiverProfileRepository.findById(testProfile.getId());
        expect(beforeDeleteResult).not.toBeNull();

        const afterDeleteResult = await caregiverProfileRepository.delete(testProfile.getId());
        expect(afterDeleteResult).toBeUndefined();
    });

    describe('getProfileList()', () => {
        /* private 2개, public 1개로 설정된 프로필 3개 저장 */
        beforeAll(async() => {
            for( let i = 0; i < 3; i++ ) {
                let profileStub: CaregiverProfile;
                profileStub = i != 1 ? 
                    TestCaregiverProfile.default().build() : 
                        TestCaregiverProfile.default().isPrivate(true).build();
                await caregiverProfileRepository.save(profileStub);
            };
        });

        afterAll(async() => {
            const mongo = getMongodb();
            await mongo.collection(testCollectionName).deleteMany({});
        });

        it('반환 결과로 Cursor가 반환되며, 개수는 2개여야 한다', async () => {
            const result = caregiverProfileRepository.getProfileList(new ObjectId().toString());
            expect(result).toBeInstanceOf(AggregationCursor);

            const resultLenght = (await result.toArray()).length;
            expect(resultLenght).toBe(2);
        });

        it('마지막 프로필 id보다 오래된 id면 결과에 포함되지 않아야 한다', async() => {
            const oldProfileId = '64c7aab5553ebdcc0159ce2f';
            const result = caregiverProfileRepository.getProfileList(oldProfileId);

            const resultLength = (await result.toArray()).length;
            expect(resultLength).toBe(0);
        });
    })
})