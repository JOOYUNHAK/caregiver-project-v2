import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ICareAppliedService } from "src/care-application/application/service/icare-applied.service";
import { CareApplication } from "src/care-application/domain/care-application.entity";
import { CareAppliedDto } from "src/care-application/interface/dto/care-applied.dto";
import { ChatMessage } from "src/chat/domain/entity/chat-message.entity";
import { ChatRoom } from "src/chat/domain/entity/chat-room.entity";
import { Participant } from "src/chat/domain/entity/participant.entity";
import { ApplicationText } from "src/chat/domain/enum/application-text.enum";
import { MessageType } from "src/chat/domain/enum/chat-message-type.enum";
import { ChatMessageRepository } from "src/chat/domain/repository/chat-message.repository";
import { ChatRoomRepository } from "src/chat/domain/repository/chat-room.repository";

@Injectable()
export class CareAppliedService implements ICareAppliedService {
    constructor(
        @InjectRepository(ChatRoom)
        private readonly roomRepository: ChatRoomRepository,
        @InjectRepository(ChatMessage)
        private readonly messageRepository: ChatMessageRepository
    ) {}
    async applied(application: CareApplication): Promise<CareAppliedDto> {
        // 채팅 방 조회
        const [applyUserId, takeUserId] = [application.getApplyUserId(), application.getCaregiverId()];
        const chatRoom = await this.roomRepository.findByUserIds(applyUserId, takeUserId);
        
        /* 새로운 신청 메시지 */
        const newAppliedMessage =
            new ChatMessage(applyUserId, takeUserId, MessageType.APPLICATION, ApplicationText.REQUESTED).withApplicationCode(application.getId());
        
        /* 채팅방이 있는 경우 메시지만 추가 */
        if( chatRoom ) {
            await this.messageRepository.save(newAppliedMessage);
            return this.toClientDto(chatRoom.getId());
        }
        /* 방이 없는 경우 생성해서 메시지 보내기 */
        const newRoom =  await this.startNewChatRoom(applyUserId, takeUserId, newAppliedMessage);
        return this.toClientDto(newRoom.getId());
    }

    private async startNewChatRoom(memberId1: number, memberId2: number, appliedMessage: ChatMessage): Promise<ChatRoom> {
        const newRoom = ChatRoom.start(new Participant(memberId1), new Participant(memberId2), appliedMessage);
        return await this.roomRepository.save(newRoom);
    }

    private toClientDto(roomId: number) { return { roomId } };
}