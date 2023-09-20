import { CareApplication } from "src/care-application/domain/care-application.entity";
import { CareApplicationRepository, customApplicationRepositoryMethods } from "src/care-application/domain/care-application.repository"
import { TestTypeOrm } from "test/unit/common/database/datebase-setup.fixture";
import { DataSource } from "typeorm";

describe('CareApplicationRepository(간병 신청서) Test', () => {
    let dataSource: DataSource;
    let applicationRepository: CareApplicationRepository;
    
    beforeAll(async() => {
        dataSource = await TestTypeOrm.withEntities(CareApplication);
        applicationRepository = dataSource.getRepository(CareApplication).extend(customApplicationRepositoryMethods);
    });

    afterAll(async() => TestTypeOrm.disconnect(dataSource));

    afterEach(async () => await applicationRepository.delete({ }));

    describe('findByProtectorAndCaregiverId()', () => {

        it('일치하는 값 찾는지 확인', async() => { 
            const [protectorId, caregiverId] = [1, 3];
            const testApplication = new CareApplication(protectorId, caregiverId);
            await applicationRepository.save(testApplication);

            const result = await applicationRepository.findByProtectorAndCaregiverId(protectorId, caregiverId);

            expect(result.getApplyUserId()).toBe(protectorId);
            expect(result.getCaregiverId()).toBe(caregiverId);
        })
    })
})