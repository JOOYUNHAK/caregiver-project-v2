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
import { ChatService } from "./chat.service";
import { RedisMessageValueDto } from "./dto/redis-message-value.dto";
import { RedisRoomValueDto } from "./dto/redis-room-value.dto";
import { RoomMemberDto } from "./dto/room-member.dto";
import { SendMessageDto } from "./dto/send-message.dto";

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

    @SubscribeMessage('newroom')
    async createNewRoom(
        @MessageBody() roomMemberDto: RoomMemberDto,
        @ConnectedSocket() client: Socket
    ): Promise<any> {

        const isExistRoom = await this.chatService.isExistRoom(roomMemberDto);
        //원래 존재하는 방이면
        if (isExistRoom)
            return isExistRoom
        //데이터베이스에 방 정보 저장
        const roomInfo = await this.chatService.saveNewRoom(roomMemberDto);

        const redisRoomValue = this.chatService.newRedisRoomValue(roomInfo);
        const redisMessageValue = this.chatService.newRedisMessageValue(roomInfo);
        //방 만든사람 바로 방에 join
        this.clientJoinRoom(client, roomInfo.roomId);

        //데이터 cache
        await this.chatService.cachingRoomInfo(roomInfo, redisRoomValue);
        await this.chatService.cachingMessage(roomInfo, redisMessageValue);

        //상대방에게 새로운 방 알림
        this.sendNewRoomEvent(roomMemberDto, redisRoomValue, redisMessageValue);
        return {
            roomInfo: {
                room: redisRoomValue,
                message: redisMessageValue
            }
        }
    }

    @SubscribeMessage('join')
    async joinRoom(
        @MessageBody() joinInfo: {
            loginId: string,
            opponentId: string,
            roomId: number,
        },
        @ConnectedSocket() client: Socket
    ) {
        const { roomId, opponentId } = joinInfo;
        //상대방이 메세지를 전부 읽었으면
        if( await this.chatService.isLastSendUser(joinInfo) ) {
            this.chatService.readNewMessage(roomId);
            this.socketServer.emit(`join:${opponentId}`, roomId);
        }
        client.join(`room:${roomId}`);
        return this.chatService.getAllMessages(roomId)
    }

    //새로운 메세지가 오면
    @SubscribeMessage('new_message')
    async sendNewMessage(
        @MessageBody() newMessage: { sendMessageDto: SendMessageDto, opponentId: string },
        @ConnectedSocket() client: Socket
    ) {
        const { sendMessageDto, opponentId } = newMessage;
        //캐시에 저장
        await this.chatService.storeMessageToCache(sendMessageDto);
        //방에 있으면 상대방에게 보내고 새로운 메세지 없음
        const joinRoomMember = await client.in(`room:${sendMessageDto.roomId}`).fetchSockets();
        if ( !! joinRoomMember[0] ) {
            this.socketServer.to(joinRoomMember[0].id).emit(`new_message`, sendMessageDto);
            await this.chatService.readNewMessage(sendMessageDto.roomId);
            return;
        }
            //상대방에게 메세지 보내기
            this.socketServer.emit(`new_message:${opponentId}`, sendMessageDto)
            //새 매세지 카운트 추가
            this.chatService.addNewMessageCount(sendMessageDto.roomId);
            //새 매세지 파일에 추가
            this.chatService.storeMessageToFile(sendMessageDto)
    }


    //간병인이 신청서를 확인한 경우
    @SubscribeMessage('check_application')
    async checkApplication(
        @MessageBody() updateContent: { protectorId: string, roomId: number, state: number },
        @ConnectedSocket() client: Socket
    ) {
        const { protectorId, roomId, state } = updateContent;
        //해당 방의 프로필 상태 업데이트
        await this.chatService.updateApplication(roomId, state);
        this.socketServer.emit(`check_application:${protectorId}`, [roomId, 1]);
        //mysql 상태 업데이트
    }

    //간병인이 신청서에 대한 확인, 거절, 수락을 한 경우
    @SubscribeMessage('response_application')
    async responseApplication(
        @MessageBody() updateContent: { responseMessage: any, protectorId: string, state: number, response: string },
        @ConnectedSocket() client: Socket
    ) {
        const { responseMessage, protectorId, state, response } = updateContent;
        const { roomId } = responseMessage;
        //매세지 저장
        await this.chatService.storeMessageToCache(responseMessage);
        //해당 방의 프로필 상태 업데이트
        await this.chatService.updateApplication(roomId, state);
        //해당 신청서 마감처리완료
        await this.chatService.applicationDeadLine(roomId, response);
        //해당 방에 같이 조인해있으면
        const joinRoomMember = await client.in(`room:${roomId}`).fetchSockets();
        if (!! joinRoomMember[0] ) {
            this.socketServer.to(joinRoomMember[0].id).emit('new_message', responseMessage);
            this.chatService.readNewMessage(roomId);
        } else {
            //상대방에게 메세지 보내기
            this.socketServer.emit(`new_message:${protectorId}`, responseMessage)
            //새 매세지 카운트 추가
            this.chatService.addNewMessageCount(roomId);
        }
        this.socketServer.emit(`response_application:${protectorId}`, [roomId, state, response]);
        //@todo mysql에서도 저장
    }
    //방 조인
    clientJoinRoom(client: Socket, roomId: number) {
        client.join(this.chatService.getRedisChatKey(roomId, 'roomInfo'));
    }

    //상대방에게 새로운 방 알림
    async sendNewRoomEvent(
        roomMember: RoomMemberDto,
        redisRoomValue: RedisRoomValueDto,
        redisMessageValue: RedisMessageValueDto
    ) {
        const opponentEventName = this.chatService.getNewRoomEventName(roomMember.careGiverId);

        this.socketServer
            .emit(opponentEventName, {
                roomInfo: {
                    room: redisRoomValue,
                    message: redisMessageValue
                }
            });
    }

    //방 나가기
    @SubscribeMessage('leave')
    leaveRoom(
        @MessageBody() roomId: number,
        @ConnectedSocket() client: Socket
    ) {
        client.leave(`room:${roomId}`)
    }
}