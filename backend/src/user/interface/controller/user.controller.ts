import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProtectorRegisterDto } from "../../../profile/interface/dto/protector-register.dto";
import { ClientDto } from "src/user-auth-common/interface/client.dto";
import { CaregiverRegisterDto } from "../../../profile/interface/dto/caregiver-register.dto";
import { UserService } from "src/user/application/service/user.service";
import { Public } from "src/auth/application/decorator/public.decorator";
import { AuthenticatedUser } from "src/auth/application/decorator/user.decorator";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { MyProfileDto } from "../dto/my-profile.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}
    /* 보호자로 회원가입 */
    @Public()
    @Post('register/protector')
    async registerAsProtector(@Body() protectorRegisterDto: ProtectorRegisterDto): Promise<ClientDto> {
        return await this.userService.register(protectorRegisterDto);
    }

    @Public()
    @Post('register/caregiver')
    async registerAsCaregiver(@Body() caregiverReigsterDto: CaregiverRegisterDto): Promise<ClientDto> {
        return await this.userService.register(caregiverReigsterDto)
    }

    /* 나의 프로필 조회 */
    @Get('profile/my')
    async getMyProfile(@AuthenticatedUser() user: User): Promise<MyProfileDto> {
        return await this.userService.getMyProfile(user);
    }
}