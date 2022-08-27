import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckAuthCodeDto } from './dto/check-auth-code.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SendService } from './send.service';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
    
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private sendService: SendService
     ) {}
    
    //회원가입 유저생성
    @Post('register')
    async createUser( @Body() createUserDto: CreateUserDto) {
        await this.userService.createUser(createUserDto);
    }

    //회원가입 아이디 인증 요청 들어올 때
    @Get('register/:id')
    async registerAuthId( @Param('id') id: string ): Promise<string | boolean> {
        //const sendCount = await this.authService.checkSmsSendCount(id);
        const findResult =  await this.userService.findId(id);
        //이미 가입된 정보면
        if(findResult) {
            return 'duplicate';
        }
        //처음 가입인데
        else {
            //1일 문자 인증 횟수를 넘지 않았으면 인증번호 전송
             if(await this.sendService.checkDayCount(id))
                return await this.sendService.sms(id);
            //1일 문자 인증 횟수 초과하였을경우       
            else
                return 'exceed'; 
        }
     }
     //인증번호 검사
     @Post('code')
     async checkAuthCode(@Body() checkAuthCodeDto: CheckAuthCodeDto ): Promise<string | boolean> {
        return await this.authService.checkAuthCode(checkAuthCodeDto);
     } 

}

