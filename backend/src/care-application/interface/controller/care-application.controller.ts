import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticatedUser } from "src/auth/application/decorator/user.decorator";
import { CareApplicationService } from "src/care-application/application/service/care-application.service";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { CareAppliedDto } from "../dto/care-applied.dto";

@Controller('care/apply')
export class CareApplicationController {
    constructor(
        private readonly applicationService: CareApplicationService
    ) {}

    @Post()
    async requestCareApplication(
        @Body('caregiverId') caregiverId: number,
        @AuthenticatedUser() applyUser: User
    ): Promise<CareAppliedDto> {
        return await this.applicationService.arrived(applyUser.getId(), caregiverId);
    }
}