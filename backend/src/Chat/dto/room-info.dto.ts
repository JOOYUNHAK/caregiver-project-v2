export class RoomInfoDto {
    roomId: number
    members: string
    state: number
    messageSeq: number
    messageType: number
    visible: null | string
    content: string
    sendId: string
    receiveId: string
    time: Date
}