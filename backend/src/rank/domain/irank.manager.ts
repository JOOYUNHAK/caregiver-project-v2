/* 프로필 조회, 키워드 검색등 랭킹을 매기는 Action들에 대해 사용자 중복 검사 */
export interface IRankManager {
    isActionPerformedByUser(action: string, userId: number): Promise<boolean>;
    recordUserAction(action: string, userId: number): Promise<void>;
}