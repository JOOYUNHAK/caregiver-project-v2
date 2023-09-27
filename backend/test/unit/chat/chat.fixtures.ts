import { ChatMessage } from "src/chat/domain/entity/chat-message.entity";
import { ChatRoom } from "src/chat/domain/entity/chat-room.entity";
import { Participant } from "src/chat/domain/entity/participant.entity";
import { ApplicationText } from "src/chat/domain/enum/application-text.enum";
import { MessageType } from "src/chat/domain/enum/chat-message-type.enum";

export class ChatFixtures {

    static createRoom(memberId1: number, memberId2: number): ChatRoom {
        const message = this.createApplicationMessage(memberId1, memberId2, memberId2);
        const room = ChatRoom.start(new Participant(memberId1), new Participant(memberId2), message);
        return room;
    };

    /* 일반 텍스트 형태의 메시지 생성 */
    static createTextMessage(memberId1: number, memberId2: number, text: string = '테스트'): ChatMessage {
        const message = new ChatMessage(memberId1, memberId2, MessageType.TEXT, text);
        return message;
    }

    /* 신청서 메시지 생성 */
    static createApplicationMessage(
        memberId1: number, memberId2: number, applicationId: number
    ): ChatMessage {
        const message = new ChatMessage(memberId1, memberId2, MessageType.APPLICATION, ApplicationText.REQUESTED)
                        .withApplicationCode(applicationId);
        return message;
    }
}