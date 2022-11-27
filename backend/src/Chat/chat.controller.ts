import { Controller, UseGuards, Get, Param, Query, Request } from '@nestjs/common';
import { JwtGuard } from 'src/auth/security/guard/jwt.guard';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(
        private chatService: ChatService
    ){}
    
    @UseGuards(JwtGuard)
    @Get('rooms')
    async getRoomList( @Request() req) {
        //redis에서 방목록 조회
        // @todo redis 서버 죽었을 시 mysql 에서 아이디로 조회
        const { id } = req.user;
        return await this.chatService.getRoomList(
            await this.chatService.getRoomIds(id)
        );
    }

    @Get('opponentId')
    async getChatOpponentId(@Query() query) {
        const { roomId } = query
        return await this.chatService.getOpponentId(roomId);
    }
}