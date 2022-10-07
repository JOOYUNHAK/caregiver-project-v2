import { Injectable, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RedisClientType } from 'redis';
@Injectable()
export class TasksService {
    constructor(
        @Inject('REDIS_CLIENT')
        private redis: RedisClientType
    ) {}

    @Cron(CronExpression.EVERY_10_SECONDS, {
        name: 'countSearchedKeyWord',
        timeZone: 'Asia/Seoul'
    })
    //많이 검색한 단어 집계
    async countSearchedKeyWord() {
        // 검색한 횟수가 5회 미만인 단어가 6개 이상이면 노출 그렇지 않으면
        // 이전 인기 키워드 노출하지만 이 전에 집계된 키워드들을 지우지 않음
        /* const _mostSearchedList: Array<string> = 
            await this.redis.ZRANGEBYSCORE('count.searched.keywords', '1', '+inf' ); */
        const _mostSearchedList: Array<string> = 
            await this.redis.sendCommand(['ZREVRANGEBYSCORE', 'count.searched.keywords', '+inf', '(0']);        

        // 6개 미만이면 계속 수집하던 내용은 남겨두고
        //각 사용자가 검색했던 내용은 지움
        if( _mostSearchedList.length <= 6 ) {
            await this.redis.SET('most.searched.keywords', _mostSearchedList.join(','));
            await this.redis.DEL('count.searched.keywords');
        }
        await this.redis.unlink('user.searched');
    }
}