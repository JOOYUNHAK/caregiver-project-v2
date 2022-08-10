import { Controller, Get, Param, } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    
    constructor(
        private authService: AuthService 
     ) {}
    
    //회원가입 아이디 인증 요청 들어올 때
    @Get('register/:id')
    async registerAuthId( @Param('id')id: string ): Promise<string | boolean> {
        const userFind =  await this.authService.findId(id);
        if(userFind)
            return false;
        return await this.authService.sendSMS(id);
     } 

    
}

