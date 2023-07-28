import { Body, Controller, Post, UseFilters, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/application/service/auth.service";
import { PhoneAuthenticationSendGuard } from "src/auth/application/guard/authentication-send.guard";
import { PhoneAuthenticationCodeGuard } from "src/auth/application/guard/authentication-code.guard";
import { ClientDto } from "src/user-auth-common/interface/client.dto";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { AuthenticatedUser } from "src/auth/application/decorator/user.decorator";
import { Public } from "src/auth/application/decorator/public.decorator";
import { RefreshAuthenticationGuard } from "src/auth/application/guard/refresh-authentication.guard";
import { TokenExpiredExceptionFilter } from "src/auth/application/filter/token-expired-exception.filter";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Public()
    @UseGuards(RefreshAuthenticationGuard)
    @UseFilters(TokenExpiredExceptionFilter)
    @Post('refresh')
    async refreshAuthentication(@AuthenticatedUser() user: User): Promise<ClientDto> {
        return await this.authService.refreshAuthentication(user);
    }

    /* 휴대폰으로 회원가입 */
    @Public()
    @UseGuards(PhoneAuthenticationSendGuard)
    @Post('register')
    async register(@Body('phoneNumber') phoneNumber: string) {
        return await this.authService.register(phoneNumber);
    }

    /* 휴대폰 인증코드 검사 */
    @Public()
    @UseGuards(PhoneAuthenticationCodeGuard)
    @Post('code/sms')
    async validateSmsCode(@AuthenticatedUser() user: User): Promise<ClientDto | void> {
        if( user ) return await this.authService.refreshAuthentication(user);
    }

    /* 로그인 */
    @Public()
    @UseGuards(PhoneAuthenticationSendGuard)
    @Post('login')
    async login(@Body('phoneNumber') phoneNumber: string): Promise<'newuser' | 'exist'> {
        return await this.authService.login(phoneNumber);
    }

    /* 로그아웃 */
    @UseFilters(TokenExpiredExceptionFilter)
    @Post('logout')
    async logout(@AuthenticatedUser() user: User): Promise<void> {
        return await this.authService.logout(user)
    }
} 