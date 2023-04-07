import { Body, Controller, Get, Param, Post, UseGuards, Request, Headers } from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthService } from './auth.service';
import { CheckAuthCodeDto } from './dto/check-auth-code.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { JwtGuard } from './security/guard/jwt.guard';
import { RolesGuard } from './security/guard/roles.guard';
import { SendService } from './send.service';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private sendService: SendService
    ) { }

    //단순 토큰 유효성 검사
    @UseGuards(JwtGuard)
    @Post('/')
    async authToken(@Request() req) {
        return req.user;
    }

    //간병 신청했을 때
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('간병인')
    @Post('application')
    async validateRole() { }

    //토큰 만료되었을 때 refreshToken으로 토큰 재발급 요청
    @Get('refreshToken/:refreshTokenIndex')
    async requestRefreshToken(@Headers() headers: any, @Param('refreshTokenIndex') index: number)
        : Promise<{ accessToken: string, user: UserDto }> {
        const jwt = headers.authorization.split(' ')[1];
        return await this.userService.requestRefreshToken(jwt, index);
    }

    //로그인 아이디 인증 요청
    @Get('login/:id')
    async loginAuthId(@Param('id') id: string): Promise<{ status: string, message: string }> {

        const dayCount = await this.sendService.checkDayCount(id);

        //해당 아이디에 대해서 일일 문자 인증 횟수가 남았는데
        if (dayCount['status'] === 'remain') {
            const findResult = await this.userService.findId(id);
            //기존 회원이면
            if (findResult) {
                return await this.sendService.sms(id, 'exist');
            }
            //새로운 회원일경우
            else {
                return await this.sendService.sms(id, 'newuser');
            }
        }
    }

    //회원가입 아이디 인증 요청 들어올 때
    @Get('register/:id')
    async registerAuthId(@Param('id') id: string): Promise<{ status: string, message: string }> {
        const findResult = await this.userService.findId(id);
        //이미 가입된 정보면
        if (findResult) {
            return { status: 'duplicate', message: '이미 가입된 회원 정보입니다.' };
        }
        //처음 가입인데
        else {
            const dayCount = await this.sendService.checkDayCount(id);
            //1일 문자 인증 횟수를 넘지 않았으면 인증번호 전송
            if (dayCount['status'] === 'remain') {
                return await this.sendService.sms(id, 'newuser');
            }
        }
    }

    //이메일 발송
    @UseGuards(JwtGuard)
    @Get('email/:email')
    async authEmail(@Param('email') email: string): Promise<{ status: string, message: string }> {
        const findResult = await this.userService.findId(email);
        if (findResult) {
            return { status: 'duplicate', message: '이미 가입된 회원 정보입니다.' };
        }
        else {
            const dayEmailCount = await this.sendService.checkDayCount(email);
            if (dayEmailCount['status'] === 'remain') {
                return await this.sendService.email(email, 'newemail');
            }
        }
    }

    //회원가입 유저생성
    @Post('register')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<{status: string, accessToken: string, user:UserDto}> {
        console.log(createUserDto)
        return await this.userService.createUser(createUserDto);
    }


    //사용자 휴대폰 인증 검사
    @Post('sms')
    async validateSms(@Body() checkAuthCodeDto: CheckAuthCodeDto):
        Promise<{ status: string, accessToken?: string, user?: UserDto }> {
        return await this.authService.validateSms(checkAuthCodeDto);
    }

    /**
     *  사용자 email 인증 이후 입력한 인증번호 검사
     *  이메일 등록과 아이디 찾기일 경우를 나눈다
     */
    @Post('email')
    async validateEmail(@Body() checkAuthCodeDto: CheckAuthCodeDto):
        Promise<{status: string}> {
            console.log('here')
            return await this.authService.validateEmail(checkAuthCodeDto);
        }
}

