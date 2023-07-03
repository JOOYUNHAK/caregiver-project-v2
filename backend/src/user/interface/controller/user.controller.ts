import { Body, Controller, Post } from "@nestjs/common";
import { ProtectorRegisterDto } from "../dto/protector-register.dto";
import { RegisterService } from "src/user/application/service/register.service";
import { ClientDto } from "src/user-auth-common/interface/client.dto";
import { CaregiverRegisterDto } from "../dto/caregiver-register.dto";
import { UserService } from "src/user/application/service/user.service";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly registerService: RegisterService
    ) {}
    /* 보호자로 회원가입 */
    @Post('register/protector')
    async registerAsProtector(@Body() protectorRegisterDto: ProtectorRegisterDto): Promise<ClientDto> {
        return await this.registerService.registerAsProtector(protectorRegisterDto);
    }

    @Post('register/caregiver')
    async registerAsCaregiver(@Body() caregiverReigsterDto: CaregiverRegisterDto): Promise<ClientDto> {
        return await this.userService.register(caregiverReigsterDto)
    }
}