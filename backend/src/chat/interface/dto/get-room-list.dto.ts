import { Time } from "src/common/shared/type/time.type";

export interface GetRoomListDto {
    roomId: number; // 방 번호
    chatPartnerId: number; // 상대방 유저 아이디
    chatPartnerName: string; // 상대방 유저 이름
    lastSendUserId: number; // 마지막 메시지 보낸 사용자 아이디
    lastMessage: string; // 마지막 메시지
    unReadMessages: string; // 읽지 않은 메시지 개수
    sendedAt: Time; // 마지막 메시지 보낸 시간
    applicationId: number; // 신청서 아이디
    recentApplicationStatus: string; // 해당 방의 마지막 신청서 상태
}