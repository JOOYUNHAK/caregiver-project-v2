import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CARE_APPLIED_SERVICE } from "src/common/shared/constants";
import { ChatRoom } from "./domain/entity/chat-room.entity";
import { ChatMessage } from "./domain/entity/chat-message.entity";
import { Participant } from "./domain/entity/participant.entity";
import { ApplicationCode } from "./domain/entity/application-code.entity";
import { CareAppliedService } from "./application/service/care-applied.service";
import { UserAuthCommonModule } from "src/user-auth-common/user-auth-common.module";
import { ChatController } from "./interface/controller/chat.controller";
import { ChatRoomService } from "./application/service/chat-room.service";
import { CareApplicationModule } from "src/care-application/care-application.module";
import { ChatRoomRepositoryProvider } from "./domain/repository/chat-room.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ChatRoom, ChatMessage, Participant, ApplicationCode
        ]),
        UserAuthCommonModule,
        CareApplicationModule
    ],
    controllers: [ChatController],
    providers: [
        {
            provide: CARE_APPLIED_SERVICE,
            useClass: CareAppliedService
        },
        ChatRoomService,
        ChatRoomRepositoryProvider
    ],
    exports: [
        CARE_APPLIED_SERVICE
    ]
})
export class ChatModule {}

