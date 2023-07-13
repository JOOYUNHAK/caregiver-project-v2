import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/application/service/auth.service";
import { RegisterDto } from "../dto/register.dto";
import { PhoneAuthenticationSendGuard } from "src/auth/application/guard/authentication-send.guard";
import { PhoneAuthenticationCodeGuard } from "src/auth/application/guard/authentication-code.guard";
import { ClientDto } from "src/user-auth-common/interface/client.dto";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { AuthenticatedUser } from "src/auth/application/decorator/user.decorator";

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
    @UseGuards(PhoneAuthenticationCodeGuard)
    @Post('code/sms')
    async validateSmsCode(@AuthenticatedUser() user: User): Promise<ClientDto | void> {
        if( user ) return await this.authService.createAuthenticationToUser(user);
    }

    /* 로그인 */
    @UseGuards(PhoneAuthenticationSendGuard)
    @Post('login')
    async login(@Body('phoneNumber') phoneNumber: string): Promise<'newuser' | 'exist'> {
        return await this.authService.login(phoneNumber);
    }
} 