import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CareApplication } from "src/care-application/domain/care-application.entity";
import { CareApplicationRepository } from "src/care-application/domain/care-application.repository";
import { ICareAppliedService } from "./icare-applied.service";
import { CARE_APPLIED_SERVICE } from "src/common/shared/constants";
import { Transactional } from "typeorm-transactional";
import { ChatRoom } from "src/chat/domain/entity/chat-room.entity";
import { ChatRoomRepository } from "src/chat/domain/repository/chat-room.repository";
import { CareAppliedDto } from "src/care-application/interface/dto/care-applied.dto";

@Injectable()
export class CareApplicationService {
    constructor(
        @InjectRepository(CareApplication)
        private readonly applicationRepository: CareApplicationRepository,
        @InjectRepository(ChatRoom)
        private readonly roomRepository: ChatRoomRepository,
        @Inject(CARE_APPLIED_SERVICE)
        private readonly careAppliedService: ICareAppliedService
    ) { }

    /* 간병 신청이 도착했을 때 */
    @Transactional()
    async arrived(protectorId: number, caregiverId: number):Promise<CareAppliedDto> {
        const previousApplication = await this.applicationRepository.findRecentApplicationFromIds(protectorId, caregiverId);

        if( !previousApplication || previousApplication.isCompleted() ) 
            return await this.createApplicationAndSend(protectorId, caregiverId);
        
        return await this.getExistRoomId(protectorId, caregiverId);
    }

    /* 신청서 저장 이후 -> 채팅방을 통해 메시지 전송 */
    async createApplicationAndSend(protectorId: number, caregiverId: number) {
        const newApplication = await this.applicationRepository.save(new CareApplication(protectorId, caregiverId));
        return await this.careAppliedService.applied(newApplication);
    }

    /* 기존 채팅방 아이디 return */
    async getExistRoomId(protectorId: number, caregiverId: number) {
        const existChatRoom = await this.roomRepository.findByUserIds(protectorId, caregiverId);
        return { roomId: existChatRoom.getId() };
    }
}