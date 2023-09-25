import { getRepositoryToken } from "@nestjs/typeorm";
import { ChatMessage } from "src/chat/domain/entity/chat-message.entity";
import { ChatRoom } from "src/chat/domain/entity/chat-room.entity";

/* Mocking ChatRoom Repository */
export const MockChatRoomRepository = {
    provide: getRepositoryToken(ChatRoom),
    useValue: {
        save: jest.fn(),
        findByUserIds: jest.fn()
    }
};

/* Mocking ChatMessage Repository */
export const MockChatMessageRepository = {
    provide: getRepositoryToken(ChatMessage),
    useValue: {
        save: jest.fn()
    }
}