import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';1
import { Cache } from 'cache-manager';
import { CheckAuthCodeDto } from './dto/check-auth-code.dto';

@Injectable()
export class AuthService {

    constructor(
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
    ) { }

    async checkAuthCode(checkAuthCodeDto: CheckAuthCodeDto): Promise<string | boolean> {
        const cacheAuthCode = await this.cacheManager.get(checkAuthCodeDto.id);
        //인증 유효시간 초과
        if (cacheAuthCode === null)
            return '인증유효시간이 초과 되었습니다. 다시 시도해주세요.';
        //인증 코드 일치
        if (checkAuthCodeDto.userInputCode === cacheAuthCode.toString())
            return true;
        //인증코드 불일치
        return false;
    }
}


