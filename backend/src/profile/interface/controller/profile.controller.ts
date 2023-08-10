import { Controller, Get, Param,  Query } from "@nestjs/common";
import { Public } from "src/auth/application/decorator/public.decorator";
import { CaregiverProfileService } from "src/profile/application/service/caregiver-profile.service";
import { ProfileListDto } from "../dto/profile-list.dto";
import { AuthenticatedUser } from "src/auth/application/decorator/user.decorator";
import { User } from "src/user-auth-common/domain/entity/user.entity";

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

    @Get('detail/:id')
    async getProfileDetail(@Param('id') profileId: string, @AuthenticatedUser() authenticatedUser: User){
        return await this.caregiverProfileService.getProfile(profileId, authenticatedUser)
    }
}