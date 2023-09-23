export interface ICareAppliedService {
    /* 간병 신청 완료 되었을 때 */
    applied(applicationId: number): Promise<void>;
}