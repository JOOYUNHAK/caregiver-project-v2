import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { CareApplicationService } from "src/care-application/application/service/care-application.service"
import { ICareAppliedService } from "src/care-application/application/service/icare-applied.service"
import { CareApplication } from "src/care-application/domain/care-application.entity"
import { CareApplicationRepository } from "src/care-application/domain/care-application.repository"
import { CARE_APPLIED_SERVICE } from "src/common/shared/constants"
import { MockCareApplicationRepo } from "test/unit/__mock__/care-application/repository.mock"
import { MockCareAppliedService } from "test/unit/__mock__/care-application/service.mock"
import { ApplicationFixtures } from "../care-application.fixtures"
import { ConflictException } from "@nestjs/common"
import { ErrorMessage } from "src/common/shared/enum/error-message.enum"

jest.mock('typeorm-transactional', () => ({
    Transactional: () => () => ({})
}));


describe('CareApplicationService(간병신청서 서비스) Test', () => {
    let careApplicationService: CareApplicationService;
    let careApplicationRepository: CareApplicationRepository;
    let careAppliedService: ICareAppliedService;
    
    beforeAll(async() => {
        const module = await Test.createTestingModule({
            providers: [
                CareApplicationService,
                MockCareApplicationRepo,
                MockCareAppliedService
            ]
        }).compile();
        careApplicationService = module.get(CareApplicationService);
        careApplicationRepository = module.get(getRepositoryToken(CareApplication));
        careAppliedService = module.get(CARE_APPLIED_SERVICE);
    });

    describe('arrived()', () => {
        
        afterEach(() => jest.clearAllMocks());

        it('해당 사용자들간의 이전 신청서가 완료되지 않았다면 오류', async() => {
            const notCompletedApplication = ApplicationFixtures.watchedApplication();
            jest.spyOn(careApplicationRepository, 'findRecentApplicationFromIds').mockResolvedValueOnce(notCompletedApplication);

            const result = async () => await careApplicationService.arrived(1, 10);
            await expect(result).rejects.toThrowError(
                new ConflictException(ErrorMessage.AlreadyHavePendingApplication)
            );
        });

        it.each([
            null,
            ApplicationFixtures.rejectedApplication()
        ])('이전 신청서가 완료되었거나 처음이라면 새로운 신청서 저장 이후 applied 서비스 호출', async (preApplication) => {
            jest.spyOn(careApplicationRepository, 'findRecentApplicationFromIds').mockResolvedValueOnce(preApplication);
            
            const newApplication = new CareApplication(1, 10);
            const saveSpy = jest.spyOn(careApplicationRepository, 'save').mockResolvedValueOnce(newApplication);
            const appliedSpy = jest.spyOn(careAppliedService, 'applied');

            await careApplicationService.arrived(1, 10);
            
            expect(saveSpy).toBeCalledTimes(1);
            expect(appliedSpy).toBeCalledTimes(1);
        })
    })
})