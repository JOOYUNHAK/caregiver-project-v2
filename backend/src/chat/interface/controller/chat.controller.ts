import { Controller, Get } from "@nestjs/common";
import { AuthenticatedUser } from "src/auth/application/decorator/user.decorator";
import { ChatRoomService } from "src/chat/application/service/chat-room.service";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { GetRoomListDto } from "../dto/get-room-list.dto";

@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatRoomService: ChatRoomService
    ) {}
    
    @Get('room/list')
    async getMyRoomList(@AuthenticatedUser() user: User): Promise<GetRoomListDto []> {
        return await this.chatRoomService.getList(user.getId());
    }
}