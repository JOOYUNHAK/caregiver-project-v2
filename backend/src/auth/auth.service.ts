import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'; 1
import { Cache } from 'cache-manager';
import { RedisClientType } from 'redis';
import { CheckAuthCodeDto } from './dto/check-auth-code.dto';

@Injectable()
export class AuthService {
    @Inject('REDIS_CLIENT')
    private redis: RedisClientType;

    //인증 코드 일치 체크
    async checkAuthCode(checkAuthCodeDto: CheckAuthCodeDto): Promise<string | boolean> {
        const cacheAuthCode = await this.redis.get(checkAuthCodeDto.id);
        //인증 유효시간 초과
        if (cacheAuthCode === null)
            return '인증유효시간이 초과 되었습니다. 다시 시도해주세요.';
        //인증 코드 일치
        if (checkAuthCodeDto.userInputCode === cacheAuthCode.toString()) {
            //인증에 성공하면 일일 인증 횟수 초기화
            const delCountKey = checkAuthCodeDto.id + 'smscount';
            await this.redis.del(`${delCountKey}`);
            return true;
        }
        //인증코드 불일치
        return false;
    }

}


