import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm";
import { CareAppliedService } from "src/chat/application/service/care-applied.service";
import { ChatMessage } from "src/chat/domain/entity/chat-message.entity";
import { ChatRoom } from "src/chat/domain/entity/chat-room.entity";
import { ChatMessageRepository } from "src/chat/domain/repository/chat-message.repository";
import { ChatRoomRepository } from "src/chat/domain/repository/chat-room.repository";
import { MockChatMessageRepository, MockChatRoomRepository } from "test/unit/__mock__/chat/repository.mock";
import { ChatFixtures } from "../chat.fixtures";
import { CareApplication } from "src/care-application/domain/care-application.entity";

describe('CareAppliedService Test', () => {
    let module: TestingModule;
    let careAppliedService: CareAppliedService;
    let roomRepository: ChatRoomRepository;
    let messageRepository: ChatMessageRepository;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            providers: [
                CareAppliedService,
                MockChatMessageRepository,
                MockChatRoomRepository
            ]
        }).compile();
        careAppliedService = module.get(CareAppliedService);
        roomRepository = module.get(getRepositoryToken(ChatRoom));
        messageRepository = module.get(getRepositoryToken(ChatMessage));
    });

    describe('applied()', () => {

        afterEach(() => jest.clearAllMocks());

        const [memberId1, memberId2] = [1, 2];
        const applicationStub = new CareApplication(1, 2);

        it('기존 방이 있는 경우 메시지만 저장한다', async () => {
            const roomStub = ChatFixtures.createRoom(memberId1, memberId2);
            jest.spyOn(roomRepository, 'findByUserIds').mockResolvedValueOnce(roomStub);

            const saveSpy = jest.spyOn(messageRepository, 'save');
            
            const messageStub = ChatFixtures.createApplicationMessage(memberId1, memberId2, applicationStub.getId());            

            await careAppliedService.applied(applicationStub);
            expect(saveSpy).toBeCalledWith(messageStub);
        });

        it('기존 방이 없는 경우 방을 생성한 이후 저장 호출', async() => {
            jest.spyOn(roomRepository, 'findByUserIds').mockResolvedValueOnce(null);

            const roomStub = ChatFixtures.createRoom(memberId1, memberId2);
            const saveSpy = jest.spyOn(roomRepository, 'save').mockResolvedValueOnce(roomStub);
            
            await careAppliedService.applied(applicationStub);
            expect(saveSpy).toBeCalledTimes(1);
        })
    })
})