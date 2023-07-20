import { Body, Controller, Post } from "@nestjs/common";
import { ProtectorRegisterDto } from "../dto/protector-register.dto";
import { ClientDto } from "src/user-auth-common/interface/client.dto";
import { CaregiverRegisterDto } from "../dto/caregiver-register.dto";
import { UserService } from "src/user/application/service/user.service";
import { Public } from "src/auth/application/decorator/public.decorator";

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
}