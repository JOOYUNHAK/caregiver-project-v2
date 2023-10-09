import { ChatMessage } from "src/chat/domain/entity/chat-message.entity";
import { ChatRoom } from "src/chat/domain/entity/chat-room.entity";
import { Participant } from "src/chat/domain/entity/participant.entity";
import { ChatRoomRepository, customRoomRepositoryMethods } from "src/chat/domain/repository/chat-room.repository";
import { TestTypeOrm } from "test/unit/common/database/datebase-setup.fixture";
import { DataSource } from "typeorm";
import { ChatFixtures } from "../chat.fixtures";
import { ApplicationCode } from "src/chat/domain/entity/application-code.entity";
import { ChatMessageRepository } from "src/chat/domain/repository/chat-message.repository";

describe('ChatRoomRepository(채팅방 저장소) Test', () => {
    let dataSource: DataSource;
    let roomRepository: ChatRoomRepository;
    let messageRepository: ChatMessageRepository;

    beforeAll(async() => {
        dataSource = await TestTypeOrm.withEntities(
            ChatRoom, ChatMessage, Participant, ApplicationCode
        )
        roomRepository = dataSource.getRepository(ChatRoom).extend(customRoomRepositoryMethods);
        messageRepository = dataSource.getRepository(ChatMessage);
    });

    afterAll(async() => await TestTypeOrm.disconnect(dataSource));

    describe('findByUserId(', () => {
        const memberId = 10;
        let addMessageRoomId:number;

        /* 시작 전 Dummy Data */
        beforeAll(async() => {
            /* 방 3개 생성 */
            for( let i = 1; i <= 3; i++ ) {
                const newRoom = ChatFixtures.createRoom(memberId, i);
                const savedRoom = await roomRepository.save(newRoom);
                
                if( i == 2 ) addMessageRoomId = savedRoom.getId();
            };
        });

        afterAll(async() => await roomRepository.delete({ }));

        it('사용자가 속한 방을 모두 가져오는지 확인', async() => {
            const result = await roomRepository.findByUserId(memberId);

            expect(result.length).toBe(3);
        });

        it('각 방의 최신 메시지와 읽지 않는 메시지 개수를 맞게 가져오는지 확인', async () => {
            const addMessageText = '추가하는 메시지';
            const textMessage = 
                ChatFixtures.createTextMessage(memberId, 100, addMessageText).in(addMessageRoomId);
            
            await messageRepository.save(textMessage);

            const result = await roomRepository.findByUserId(memberId);
            
            /* 방 목록은 최신 메시지순이므로 메시지 추가한 방이 첫번째에 나타나게됨 */
            result.map((room, index) => {
                if( index == 0 ) {
                    expect(room.lastMessage).toEqual(addMessageText);
                    expect(room.unReadMessages).toBe('2'); 
                }
            });
        });

        it('조회된 방이 없는 경우 null을 반환하는지 확인', async() => {
            const notExistUserId = 1000000;
            const result = await roomRepository.findByUserId(notExistUserId);

            expect(result).toBe(null);
        })
    });

    describe('findByUserIds()', () => {
        const [memberId1, memberId2] = [1,2];
        
        beforeAll(async () => {
            const testRoom = ChatFixtures.createRoom(memberId1, memberId2);
            await roomRepository.save(testRoom);
        });

        afterAll(async() => await roomRepository.delete({ }));
        
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