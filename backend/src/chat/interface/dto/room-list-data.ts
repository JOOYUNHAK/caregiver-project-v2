import { Time } from "src/common/shared/type/time.type";

/* DB에서 조회 직후 Interface */
export interface RoomListData {
    roomId: number; // 방 번호
    chatPartnerId: number; // 채팅 상대방 아이디
    lastSendUserId: number; // 마지막 메시지 보낸 사용자 아이디
    lastMessage: string; // 마지막 메시지
    unReadMessages: string; // 읽지 않은 메시지 개수
    sendedAt: Time; // 마지막 메시지 보낸 날짜
    applicationId: number; // 해당 방의 최신 신청서 아이디
}