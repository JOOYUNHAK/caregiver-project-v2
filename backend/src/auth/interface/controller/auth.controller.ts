import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "src/auth/application/service/auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    /* 휴대폰으로 회원가입 */
    @Post('register')
    async register(@Body('phoneNumber') phoneNumber: string) {
        return await this.authService.register(phoneNumber);
    }
}