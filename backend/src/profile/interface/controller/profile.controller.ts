import { Body, Controller, Get, Param,  Post,  Query, UseGuards } from "@nestjs/common";
import { Public } from "src/auth/application/decorator/public.decorator";
import { CaregiverProfileService } from "src/profile/application/service/caregiver-profile.service";
import { ProfileListDto } from "../dto/profile-list.dto";
import { AuthenticatedUser } from "src/auth/application/decorator/user.decorator";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { GetProfileListDto } from "../dto/get-profile-list.dto";
import { Roles } from "src/common/shared/decorator/roles.decorator";
import { ROLE } from "src/user-auth-common/domain/enum/user.enum";
import { ProfileLikeHistoryService } from "src/profile/application/service/profile-like-history.service";
import { RoleGuard } from "src/core/guard/role.guard";

@Controller('profile')
export class ProfileController {

    constructor(
        private readonly caregiverProfileService: CaregiverProfileService,
        private readonly profileLikeHistoryService: ProfileLikeHistoryService
    ) {};

    @Public()
    @Get('list')
    async getProfileList(@Query() getProfilListDto: GetProfileListDto): Promise<ProfileListDto> {
        return await this.caregiverProfileService.getProfileList(getProfilListDto);
    }

    @Get('detail/:id')
    async getProfileDetail(@Param('id') profileId: string, @AuthenticatedUser() authenticatedUser: User){
        return await this.caregiverProfileService.getProfile(profileId, authenticatedUser)
    }

    @Post('like')
    @Roles(ROLE.PROTECTOR)
    @UseGuards(RoleGuard)
    async pushLike(
        @Body('profileId') profileId: string,
        @AuthenticatedUser() user: User
    ) {
        return await this.profileLikeHistoryService.addHistory(profileId, user.getId());
    }
}