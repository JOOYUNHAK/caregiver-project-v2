import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { RedisModule } from "src/redis/redis.module";
import { ChatService } from "./chat.service";
import { EventGateway } from "./event.gateway";
import { messageRepository } from "./repository/message.repository";
import { roomMemberRepository } from "./repository/room-member.repository";
import { roomRepository } from "./repository/room.repository";

@Module({
    imports: [
        DatabaseModule,
        RedisModule
    ],
    providers: [
        EventGateway,
        ChatService,
        ...roomRepository,
        ...roomMemberRepository,
        ...messageRepository
    ]
})
export class ChatModule {}