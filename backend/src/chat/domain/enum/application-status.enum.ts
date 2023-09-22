/* 간병 신청서 상태 */
export enum ApplicationStatus {
    REQUESTED = 0, // 요청된 상태
    WATCHED = 1, // 상대방이 본 상태
    REJECTED = 2, // 거부된 상태
    ACCESSED = 3 // 승인 된 상태
}