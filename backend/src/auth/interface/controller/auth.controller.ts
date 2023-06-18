import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { AuthService } from "src/auth/application/service/auth.service";
import { PhoneValidatorPipe } from "src/user-auth-common/interface/pipe/phone-validator.pipe";
import { RegisterDto } from "../dto/register.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    /* 휴대폰으로 회원가입 */
    @UsePipes(PhoneValidatorPipe)
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto.phoneNumber);
    }
} 