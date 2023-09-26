import { CareApplication } from "src/care-application/domain/care-application.entity";
import { CareApplicationRepository, customApplicationRepositoryMethods } from "src/care-application/domain/care-application.repository"
import { TestTypeOrm } from "test/unit/common/database/datebase-setup.fixture";
import { DataSource } from "typeorm";
import { ApplicationFixtures } from "../care-application.fixtures";

describe('CareApplicationRepository(간병 신청서) Test', () => {
    let dataSource: DataSource;
    let applicationRepository: CareApplicationRepository;
    
    beforeAll(async() => {
        dataSource = await TestTypeOrm.withEntities(CareApplication);
        applicationRepository = dataSource.getRepository(CareApplication).extend(customApplicationRepositoryMethods);
    });

    afterAll(async() => await TestTypeOrm.disconnect(dataSource));

    afterEach(async () => await applicationRepository.clear());

    describe('findRecentApplicationByIds()', () => {
        
        const [protectorId, caregiverId] = [1, 10];
        
        /* 테스트 전 더미 데이터 */
        beforeAll(async() => {
            for( let i = 0; i < 3; i++ ) {
                const application = new CareApplication(protectorId, caregiverId);
                await applicationRepository.save(application);
            };
        });

        it('가장 최근의 신청서를 가져오는지 확인', async () => {
            const recentApplication = new CareApplication(protectorId, caregiverId);        
            recentApplication.watched();
            await applicationRepository.save(recentApplication);

            const result = await applicationRepository.findRecentApplicationFromIds(protectorId, caregiverId);
            expect(result.getStatus()).toBe(recentApplication.getStatus());
        });
    });

    describe('findStatusByIds()', () => {
        const testApplicaiontList = [
            ApplicationFixtures.watchedApplication(),
            ApplicationFixtures.watchedApplication(),
            ApplicationFixtures.rejectedApplication()
        ];

        const applicationIdList = [];

        beforeAll(async() => {
            for( let i = 0; i < testApplicaiontList.length; i++ ) {
                const savedApplication = await applicationRepository.save(testApplicaiontList[i]);
                applicationIdList.push(savedApplication.getId());
            };
        });

        it('신청서들의 상태를 맞게 가져오는지 확인', async () => {
            const result = await applicationRepository.findStatusByIds(applicationIdList);

            result.map( ({ status }, index) => {
                expect(status).toBe(testApplicaiontList[index].getStatus());
            });
        })
    })
})