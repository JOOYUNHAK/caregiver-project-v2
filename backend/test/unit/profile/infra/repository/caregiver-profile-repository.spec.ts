import { ConfigModule, ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { CaregiverProfile } from "src/profile/domain/entity/caregiver/caregiver-profile.entity";
import { CaregiverProfileRepository } from "src/profile/infra/repository/caregiver-profile.repository";
import { ConnectMongoDB, DisconnectMongoDB, getMongodb } from "test/unit/common/database/datebase-setup.fixture";
import { TestCaregiverProfile } from "../../profile.fixtures";
import { ProfileListQueryOptions } from "src/profile/domain/profile-list-query-options";
import { ProfileQueryFactory } from "src/profile/infra/repository/profile-query.factory";
import { ProfileListCursor } from "src/profile/domain/profile-list.cursor";
import { ProfileSort } from "src/profile/domain/profile-sort";
import { ProfileFilter } from "src/profile/domain/profile-filter";
import { Db } from "mongodb";
import { Sort } from "src/profile/domain/enum/sort.enum";

describe('간병인 프로필정보 저장소(CaregiverProfileRepository) Test', () => {
    let testProfile: CaregiverProfile, 
        caregiverProfileRepository: CaregiverProfileRepository,
        mongo: Db;

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
                CaregiverProfileRepository,
                ProfileQueryFactory
            ]
        }).compile()
        caregiverProfileRepository = module.get(CaregiverProfileRepository);
        mongo = getMongodb();
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

        describe('비공개 프로필만 가져오는지 확인', () => {
            afterAll(async() => await mongo.collection(testCollectionName).deleteMany({}))
            /* private 1개, public 4개로 설정된 프로필 3개 저장 */
            beforeAll(async() => {
                let profileStub: CaregiverProfile;

                for( let i = 0 ; i < 5; i++ ) {
                    profileStub = i == 0 ?
                        TestCaregiverProfile.default().build() :
                            TestCaregiverProfile.default().isPrivate(true).build();
                    await caregiverProfileRepository.save(profileStub);
                }                
            });

            it('반환된 프로필이 1개인지 확인', async() => {
                const listQueryOptions = new ProfileListQueryOptions(
                    new ProfileListCursor(), new ProfileSort(), new ProfileFilter()
                );
                const result = await caregiverProfileRepository.getProfileList(listQueryOptions);
                expect(result.length).toBe(1);
            });
        });

        describe('쿼리 옵션 객체에 따른 Test', () => {
            let firstLowPayProfile: CaregiverProfile, 
                middleProfile: CaregiverProfile,
                middleNextProfile: CaregiverProfile, 
                lastProfile: CaregiverProfile,
                profileStub: CaregiverProfile;

            afterAll(async() => await mongo.collection(testCollectionName).deleteMany({}))
            
            beforeAll(async() => {
                const profileList = [];
                for( let i = 0; i < 10; i++ ) {
                    profileStub = 
                        TestCaregiverProfile.default().userId(i).pay(i + 10).build();
                    
                    if( i == 0 ) firstLowPayProfile = profileStub;
                    if( i == 3 ) middleNextProfile = profileStub;
                    if( i == 4 ) middleProfile = profileStub;
                    if( i == 9 ) lastProfile = profileStub;

                    profileList.push(profileStub);
                }
                await mongo.collection(testCollectionName).insertMany(profileList);
            })
            describe('쿼리에 정렬 옵션이 없고 다음 커서가 없거나 아이디만 있는 경우', () => {
                it('없으면 최신순으로 5개의 리스트를 가져온다', async() => {
                    const listQueryOptions = new ProfileListQueryOptions(
                        new ProfileListCursor(), new ProfileSort(), new ProfileFilter()
                    );

                    const result = await caregiverProfileRepository.getProfileList(listQueryOptions);

                    expect(result[0].id).toBe(lastProfile.getId()); // 기본 최신순 정렬이므로 마지막 아이디
                    expect(result.length).toBe(5);
                });

                it('아이디만 있는 경우 해당 아이디를 가진 프로필보다 오래된 프로필들을 반환', async() => {
                    const listQueryOptions = new ProfileListQueryOptions(
                        new ProfileListCursor(middleProfile.getId()), new ProfileSort(), new ProfileFilter()
                    );

                    const result = await caregiverProfileRepository.getProfileList(listQueryOptions);

                    expect(result[0].id).toBe(middleNextProfile.getId());
                    expect(result.length).toBe(4);
                });
            });

            describe('쿼리 정렬 옵션이 있는 경우', () => {
                it('다음 커서가 없으면 최신 순으로 처음부터 반환한다', async () => {
                    const listQueryOptions = new ProfileListQueryOptions(
                        new ProfileListCursor(), new ProfileSort(Sort.LowPay), new ProfileFilter()
                    );

                    const result = await caregiverProfileRepository.getProfileList(listQueryOptions);
                    
                    /* 원래는 최신순 정렬이기에 가장 처음 만들어진 프로필이 
                        올 수 없지만 일당 낮은 순 정렬을 통해 결과가 바뀜
                     */
                    expect(result[0].id).toBe(firstLowPayProfile.getId());
                });

                it('조합된 다음 커서가 있으면 파싱해서 이후 프로필을 반환한다', async () => {
                    const listQueryOptions = new ProfileListQueryOptions(
                        new ProfileListCursor(`${middleNextProfile.getPay()}_${middleNextProfile.getId()}`), new ProfileSort(Sort.LowPay), new ProfileFilter()
                    );
                    
                    const result = await caregiverProfileRepository.getProfileList(listQueryOptions);
                    
                    expect(result[0].id).toBe(middleProfile.getId());
                    expect(result[0].pay).toBeGreaterThan(middleNextProfile.getPay());
                });

                it('조합된 다음 커서가 있고 정렬 필드에 동일한 조건이 존재하면 아이디로 비교하여 반환', async() => {
                    const samePay = 10;

                    const firstProfile = TestCaregiverProfile.default().pay(samePay).build();
                    const secondProfile = TestCaregiverProfile.default().pay(samePay).build();
                    const lastProfile = TestCaregiverProfile.default().pay(samePay).build();
                    await mongo.collection(testCollectionName).insertMany([firstProfile, secondProfile, lastProfile]);

                    const listQueryOptions = new ProfileListQueryOptions(
                        new ProfileListCursor(`${samePay}_${lastProfile.getId()}`), new ProfileSort(Sort.LowPay), new ProfileFilter()
                    );

                    const result = await caregiverProfileRepository.getProfileList(listQueryOptions);
                    expect(result[0].id).toBe(secondProfile.getId());
                    expect(result[0].pay).toBe(samePay);
                })
            })
        })
    })
})