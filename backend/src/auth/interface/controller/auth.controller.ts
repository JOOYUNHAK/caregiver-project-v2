import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/application/service/auth.service";
import { RegisterDto } from "../dto/register.dto";
import { ValidateSmsCodeDto } from "../dto/validate-code.dto";
import { PhoneAuthenticationSendGuard } from "src/auth/application/guard/authentication-send.guard";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    /* 휴대폰으로 회원가입 */
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto.phoneNumber);
    }

    /* 휴대폰 인증코드 검사 */
    @Post('code/sms')
    async validateSmsCode(@Body() validateSmsCodeDto: ValidateSmsCodeDto) {
        return await this.authService.validateSmsCode(validateSmsCodeDto);
    }

    /* 로그인 */
    @UseGuards(PhoneAuthenticationSendGuard)
    @Post('login')
    async login(@Body('phoneNumber') phoneNumber: string): Promise<'newuser' | 'exist'> {
        return await this.authService.login(phoneNumber);
    }
} 