import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { DataSource } from "typeorm";
import { ChatService } from "./chat.service";
import { RoomMemberDto } from "./dto/room-member.dto";
import { Room } from "./entity/room.entity";

@WebSocketGateway(
    8800,
    {
        transports: ['websocket'],
        namespace: 'chat'
    }
)
export class EventGateway implements
    OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private chatService: ChatService
    ) { }

    @WebSocketServer()
    socketServer: Server

    handleConnection(client: Socket) {
        console.log('connect', client.id)
    }

    handleDisconnect(client: Socket) {
        console.log('disconnect', client.id)
    }

    @SubscribeMessage('NEW_ROOM')
    async createNewRoom(
        @MessageBody() roomName: string,
        @ConnectedSocket() client: Socket
    ) {

        //방 생성한 사람과 상대방
        const [protectorId, careGiverId] = this.chatService.parsingRoomName(roomName);
        //방 만든사람은 바로 방에 join
        client.join(roomName);

        //데이터베이스에 저장
        const roomInfo = await this.chatService.saveNewRoom(roomName);

        //데이터 cache
        await this.chatService.cacheRoomInfo(roomInfo);
      
        //상대방에게 새로운 방 알림
        this.sendNewRoomEvent(careGiverId, protectorId);

    }

    //상대방에게 새로운 방 알림
    async sendNewRoomEvent(protectorId: string, careGiverId: string) {
        //상대 이벤트 명
        const opponentNewRoomEvent = this.chatService.getNewRoomEventName(careGiverId);

        //처음 생성된 방 정보
        const roomInfo = await this.chatService.getInitRoomInfo(protectorId, careGiverId);

        this.socketServer.emit(opponentNewRoomEvent);
    }

    //방 나가기
    @SubscribeMessage('LEAVE_ROOM')
    leaveRoom(
        @MessageBody() roomMember: {
            protectorId: string,
            careGiverId: string
        },
        @ConnectedSocket() client: Socket
    ) {
        const { protectorId, careGiverId } = roomMember;
        const roomName = this.chatService.getRoomName(protectorId, careGiverId);
        client.leave(roomName);
    }
}