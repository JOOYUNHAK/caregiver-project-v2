import { ChatMessage } from "src/chat/domain/entity/chat-message.entity";
import { ChatRoom } from "src/chat/domain/entity/chat-room.entity";
import { Participant } from "src/chat/domain/entity/participant.entity";
import { ChatRoomRepository, customRoomRepositoryMethods } from "src/chat/domain/repository/chat-room.repository";
import { TestTypeOrm } from "test/unit/common/database/datebase-setup.fixture";
import { DataSource } from "typeorm";
import { ChatFixtures } from "../chat.fixtures";

describe('ChatRoomRepository(채팅방 저장소) Test', () => {
    let dataSource: DataSource;
    let roomRepository: ChatRoomRepository;
    
    beforeAll(async() => {
        dataSource = await TestTypeOrm.withEntities(
            ChatRoom, ChatMessage, Participant
        )
        roomRepository = dataSource.getRepository(ChatRoom).extend(customRoomRepositoryMethods);
    });

    afterAll(async() => await TestTypeOrm.disconnect(dataSource));

    describe('findByUserIds()', () => {
        const [memberId1, memberId2] = [1,2];
        
        beforeAll(async () => {
            const testRoom = ChatFixtures.createRoom(memberId1, memberId2);
            await roomRepository.save(testRoom);
        });

        afterAll(async() => await roomRepository.delete({} ));
        
        it('주어진 사용자들이 속한 방을 찾는지 확인', async() => {
            const result = await roomRepository.findByUserIds(memberId1, memberId2);
            
            expect(result.getId()).not.toBe(null);
        });

        it('주어진 사용자들의 방이 없을 경우 null을 반환하는지 확인', async() => {
            const result = await roomRepository.findByUserIds(memberId1, 100);

            expect(result).toBe(null);
        })
    })
})