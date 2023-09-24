import { CareApplication } from "src/care-application/domain/care-application.entity";

export interface ICareAppliedService {
    /* 간병 신청 완료 되었을 때 */
    applied(application: CareApplication): Promise<void>;
}