import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckAuthCodeDto } from './dto/check-auth-code.dto';
import { SendService } from './send.service';
import { UserService } from './user.service';


@Controller('auth')
export class AuthController {
    
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private sendService: SendService
     ) {}

    //회원가입 아이디 인증 요청 들어올 때
    @Get('register/:id')
    async registerAuthId( @Param('id') id: string ): Promise<string | boolean> {
        const findResult =  await this.userService.findId(id);
        //이미 가입된 정보면
        if(findResult) {
            return false;
        }
        //가입 안되었으면 인증번호 요청
        return await this.sendService.sms(id);
     }
     //인증번호 검사
     @Post('check')
     async checkAuthCode(@Body() checkAuthCodeDto: CheckAuthCodeDto ): Promise<string | boolean> {
        return await this.authService.checkAuthCode(checkAuthCodeDto);
     } 

}

