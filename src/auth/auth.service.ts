import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { CheckAuthCodeDto } from './dto/check-auth-code.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject('REDIS_CLIENT')
        private redis: RedisClientType,
        private userService: UserService,

    ) { }


    /**
     * 휴대폰 인증 번호 일치 검증 함수
     * @todo: 휴대폰 인증과 경우만 나눠서 코드 합치기, tryblcokkey 말고 잔여 횟수로 판단하는거로 고치기
     * @param checkAuthCodeDto 
     * @returns 회원가입: status, 로그인: accessToken
     */
    async validateSms(checkAuthCodeDto: CheckAuthCodeDto): Promise<{ status: string, accessToken?: string, user?: UserDto }> {
        const path: string = checkAuthCodeDto.path;
        const id: string = checkAuthCodeDto.id;
        const newUser: boolean = checkAuthCodeDto.newUser;

        const tryBlockKey: string = id + 'tryblock'; //인증번호 일치 시도 횟수 초과여부
        const tryBlock = await this.redis.get(tryBlockKey);
        const tryCountKey: string = id + 'trycount'; //인증번호 일치 시도 횟수
        const cacheAuthCode = await this.redis.get(id);

        //휴대폰
        if (tryBlock === 'true')
            throw new HttpException(
                '인증받은 전화번호가 아닙니다. 다시 받아주세요.',
                HttpStatus.FORBIDDEN
            );
        //인증 유효시간 초과
        else if (cacheAuthCode === null)
            throw new HttpException(
                '인증유효시간이 초과 되었습니다. 다시 시도해주세요.',
                HttpStatus.NOT_FOUND
            );

        //인증 코드 일치 (로그인 성공시)
        if (checkAuthCodeDto.userInputCode === cacheAuthCode.toString()) {

            //일일 인증 횟수, 아이디 인증번호,  초기화 
            const delCountKey = id + 'smscount';
            await this.redis.del(`${delCountKey}`);
            await this.redis.del(`${id}`);
            await this.redis.del(`${tryCountKey}`);

            //경로가 회원가입이면 인증코드 일치 여부만 판단
            if (path === 'register' || newUser)
                return { status: 'success' }
            else if (path === 'login' || newUser == false) {
                const accessToken = await this.userService.setAccessToken(id);
                //RefreshToken 생성
                const user = await this.userService.setRefreshToken(id);

                return { status: 'success', accessToken: accessToken, user: user };
            }
        }

        //인증코드 불일치 (로그인 실패)
        let tryCount: string = await this.redis.get(`${tryCountKey}`);

        //총 인증번호 3번 기회
        if (tryCount === null) {
            await this.redis.set(`${tryCountKey}`, 1, {
                EX: 90
            });
            //처음시도 0회
            tryCount = 0 + '';
        }
        else {
            await this.redis.incr(`${tryCountKey}`);
        }
        const remainCount: number = 2 - parseInt(tryCount);

        if (remainCount == 0) {
            const ttl: number = 180 - await this.redis.ttl(id);
            await this.redis.set(`${tryBlockKey}`, 'true', {
                EX: ttl
            });

            //마지막 시도 직후 
            throw new HttpException(
                '인증번호를 연속으로 틀렸습니다. 다시 받아주세요.',
                HttpStatus.UNAUTHORIZED
            );
        }
        //잔여 카운트가 남았을 경우
        throw new HttpException(
            `인증번호가 일치하지 않습니다.(${remainCount}회 남음)`,
            HttpStatus.UNAUTHORIZED
        );
    }

    /**
     * 이메일 인증 번호 일치 여부
     *  @todo: 휴대폰 인증과 경우만 나눠서 코드 합치기, tryblcokkey 말고 잔여 횟수로 판단하는거로 고치기
     *  @param checkAuthCodeDto 
     *  @returns 이메일 등록: email, 아이디 변경: 해당 아이디
     */
    async validateEmail(checkAuthCodeDto: CheckAuthCodeDto): Promise<{ status: string }> {
        const path: string = checkAuthCodeDto.path;
        const id: string = checkAuthCodeDto.id;
        const email: string = checkAuthCodeDto.email;

        const tryBlockKey: string = email + 'tryblock'; //인증번호 일치 시도 횟수 초과여부
        const tryBlock = await this.redis.get(tryBlockKey);
        const tryCountKey: string = email + 'trycount'; //인증번호 일치 시도 횟수
        const cacheAuthCode = await this.redis.get(email);

        //이메일
        if (tryBlock === 'true')
            throw new HttpException(
                '인증받은 메일이 아닙니다. 다시 받아주세요.',
                HttpStatus.FORBIDDEN
            );
        //인증 유효시간 초과
        else if (cacheAuthCode === null)
            throw new HttpException(
                '인증유효시간이 초과 되었습니다. 다시 시도해주세요.',
                HttpStatus.NOT_FOUND
            );

        //인증 코드 일치
        if (checkAuthCodeDto.userInputCode === cacheAuthCode.toString()) {

            //일일 인증 횟수, 아이디 인증번호,  초기화 
            const delCountKey = id + 'emailcount';
            await this.redis.del(`${delCountKey}`);
            await this.redis.del(`${email}`);
            await this.redis.del(`${tryCountKey}`);

            //이메일 등록
            if (path === 'register') {
                await this.userService.registerEmail(id, email);
                return { status: 'success' }
            }
            //아이디 변경  
            else if (path === 'changeId') {
                return { status: 'success' }
            }
        }

        //인증코드 불일치 (인증 실패)
        let tryCount: string = await this.redis.get(`${tryCountKey}`);

        //총 인증번호 3번 기회
        if (tryCount === null) {
            await this.redis.set(`${tryCountKey}`, 1, {
                EX: 90
            });
            //처음시도 0회
            tryCount = 0 + '';
        }
        else {
            await this.redis.incr(`${tryCountKey}`);
        }
        const remainCount: number = 2 - parseInt(tryCount);

        if (remainCount == 0) {
            const ttl: number = 180 - await this.redis.ttl(email);
            await this.redis.set(`${tryBlockKey}`, 'true', {
                EX: ttl
            });

            //마지막 시도 직후 
            throw new HttpException(
                '인증번호를 연속으로 틀렸습니다. 다시 받아주세요.',
                HttpStatus.UNAUTHORIZED
            );
        }
        //잔여 카운트가 남았을 경우
        throw new HttpException(
            `인증번호가 일치하지 않습니다.(${remainCount}회 남음)`,
            HttpStatus.UNAUTHORIZED
        );
    }
}


