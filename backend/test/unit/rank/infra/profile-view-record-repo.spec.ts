import { ObjectId } from "mongodb";
import { ProfileViewRecord } from "src/rank/domain/entity/profile-view-record.entity";
import { IActionRecordRepository } from "src/rank/domain/iaction-record.repository"
import { profileViewRecordRepoMethods } from "src/rank/infra/profile-view-record.repository";
import { TestTypeOrm } from "test/unit/common/database/datebase-setup.fixture";
import { DataSource } from "typeorm";

describe('프로필 조회 기록 저장소(ProfileViewRecordRepository', () => {
    let profileViewRecordRepository: IActionRecordRepository<ProfileViewRecord>;
    let dataSource: DataSource;

    beforeAll(async() => {
        dataSource = await TestTypeOrm.withEntities(ProfileViewRecord);
        profileViewRecordRepository = dataSource.getRepository(ProfileViewRecord).extend(profileViewRecordRepoMethods);
    });

    afterAll(async() => {
        await profileViewRecordRepository.clear();
        await TestTypeOrm.disconnect(dataSource);
    });

    describe('findRecordByActionAndUser', () => {
        const [profileId, userId] = [new ObjectId().toHexString(), 1];

        beforeAll(async() => {
            const profileViewRecord = new ProfileViewRecord(profileId, userId);
            await profileViewRecordRepository.save(profileViewRecord)
        });

        it('프로필을 조회한 사용자면 결과에 포함되어야 한다', async () => {
            const result = await profileViewRecordRepository.findRecordByActionAndUser(profileId, userId);

            expect(result.getProfileId()).toBe(profileId);
            expect(result.getViewUser()).toBe(userId);            
        });

        it('조회한 사용자가 아니면 null 값이 나온다', async () => {
            const result = await profileViewRecordRepository.findRecordByActionAndUser(profileId, 123);
            
            expect(result).toBe(null);
        })
    })
})