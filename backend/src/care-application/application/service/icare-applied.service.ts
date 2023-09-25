import { CareApplication } from "src/care-application/domain/care-application.entity";
import { CareAppliedDto } from "src/care-application/interface/dto/care-applied.dto";

export interface ICareAppliedService {
    /* 간병 신청 완료 되었을 때 */
    applied(application: CareApplication): Promise<CareAppliedDto>;
}