import { Body, Controller, Post } from "@nestjs/common";
import { ProtectorRegisterDto } from "../dto/protector-register.dto";
import { RegisterService } from "src/user/application/service/register.service";
import { ClientDto } from "src/user-auth-common/interface/client.interface";

@Controller('user')
export class UserController {
    constructor(
        private readonly registerService: RegisterService
    ) {}
    /* 보호자로 회원가입 */
    @Post('register/protector')
    async registerAsProtector(@Body() protectorRegisterDto: ProtectorRegisterDto): Promise<ClientDto> {
        return await this.registerService.registerAsProtector(protectorRegisterDto);
    }
}