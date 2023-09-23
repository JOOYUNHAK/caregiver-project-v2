import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CareApplication } from "src/care-application/domain/care-application.entity";
import { CareApplicationRepository } from "src/care-application/domain/care-application.repository";
import { ICareAppliedService } from "./icare-applied.service";
import { CARE_APPLIED_SERVICE } from "src/common/shared/constants";

@Injectable()
export class CareApplicationService {
    constructor(
        @InjectRepository(CareApplication)
        private readonly applicationRepository: CareApplicationRepository,
        @Inject(CARE_APPLIED_SERVICE)
        private readonly careAppliedService: ICareAppliedService
    ) { }

    /* 간병 신청이 도착했을 때 */
    async arrived(protectorId: number, caregiverId: number) {
        await this.checkPreApplicationBeCompleted(protectorId, caregiverId);
        
        /* 신청서 저장 이후 -> 채팅방을 통해 메시지 전송 */
        const newApplication = await this.applicationRepository.save(new CareApplication(protectorId, caregiverId));
        return await this.careAppliedService.applied(newApplication.getId());
    }

    private async checkPreApplicationBeCompleted(protectorId: number, caregiverId: number) {
        const previousApplication =
            await this.applicationRepository.findRecentApplicationFromIds(protectorId, caregiverId);

        if (previousApplication) previousApplication.validate();
    }
}