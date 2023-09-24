import { ChatMessage } from "src/chat/domain/entity/chat-message.entity";
import { ChatRoom } from "src/chat/domain/entity/chat-room.entity";
import { Participant } from "src/chat/domain/entity/participant.entity";
import { ApplicationText } from "src/chat/domain/enum/application-text.enum";
import { MessageType } from "src/chat/domain/enum/chat-message-type.enum";

export class ChatFixtures {
    static createRoom(memberId1: number, memberId2: number): ChatRoom {
        const message = new ChatMessage(memberId1, memberId2, MessageType.APPLICATION, ApplicationText.REQUESTED);
        const room = ChatRoom.start(new Participant(memberId1), new Participant(memberId2), message);
        return room;
    }
}