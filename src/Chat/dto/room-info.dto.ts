export class RoomInfoDto {
    roomId: number
    members: string
    memberIds: string
    state: number
    messageSeq: number
    type: number
    visible: null | string
    content: string
    sendId: string
    receiveId: string
    time: Date
    newMessage?: number
}