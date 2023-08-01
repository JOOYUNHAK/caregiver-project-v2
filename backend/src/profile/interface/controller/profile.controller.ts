import { Controller, Get, Query } from "@nestjs/common";
import { Public } from "src/auth/application/decorator/public.decorator";
import { CaregiverProfileService } from "src/profile/application/service/caregiver-profile.service";
import { ProfileListDto } from "../dto/profile-list.dto";

@Controller('profile')
export class ProfileController {

    constructor(
        private readonly caregiverProfileService: CaregiverProfileService
    ) {};

    @Public()
    @Get('list')
    async getProfileList(@Query('lastProfileId') lastProfileId?: string): Promise<ProfileListDto []> {
        return await this.caregiverProfileService.getProfileList(lastProfileId);
    }
}