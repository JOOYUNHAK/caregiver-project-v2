export class RedisRoomValueDto {
    roomId: number;
    memberIds: string
    state: null|number;
    members: string;
    newMessage: number;
}