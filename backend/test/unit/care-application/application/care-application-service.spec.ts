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
import { ChatRoomRepository } from "src/chat/domain/repository/chat-room.repository"
import { MockChatRoomRepository } from "test/unit/__mock__/chat/repository.mock"
import { ChatRoom } from "src/chat/domain/entity/chat-room.entity"
import { ChatFixtures } from "test/unit/chat/chat.fixtures"

jest.mock('typeorm-transactional', () => ({
    Transactional: () => () => ({})
}));


describe('CareApplicationService(간병신청서 서비스) Test', () => {
    let careApplicationService: CareApplicationService;
    let careApplicationRepository: CareApplicationRepository;
    let careAppliedService: ICareAppliedService;
    let chatRommRepository: ChatRoomRepository;

    beforeAll(async() => {
        const module = await Test.createTestingModule({
            providers: [
                CareApplicationService,
                MockCareApplicationRepo,
                MockCareAppliedService,
                MockChatRoomRepository
            ]
        }).compile();
        careApplicationService = module.get(CareApplicationService);
        careApplicationRepository = module.get(getRepositoryToken(CareApplication));
        careAppliedService = module.get(CARE_APPLIED_SERVICE);
        chatRommRepository = module.get(getRepositoryToken(ChatRoom));
    });

    describe('arrived()', () => {
        
        afterEach(() => jest.clearAllMocks());

        it('해당 사용자들간의 이전 신청서가 완료되지 않았다면 기존 채팅방 아이디 반환', async() => {
            const [memberId1, memberId2] = [1, 2];
            
            const notCompletedApplication = ApplicationFixtures.watchedApplication();
            jest.spyOn(careApplicationRepository, 'findRecentApplicationFromIds').mockResolvedValueOnce(notCompletedApplication);

            const existRoom = ChatFixtures.createRoom(memberId1, memberId2);
            jest.spyOn(chatRommRepository, 'findByUserIds').mockResolvedValueOnce(existRoom);

            const result = await careApplicationService.arrived(memberId1, memberId2);

            expect(result).toHaveProperty('roomId');
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