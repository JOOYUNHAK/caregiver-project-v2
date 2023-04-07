import { Injectable, Inject } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Repository, DataSource } from 'typeorm';
import { RedisClientType } from 'redis';
import { CareGiver } from 'src/auth/entity/register.entity';
import * as fs from 'fs'
@Injectable()
export class TasksService {
    constructor(
        @Inject('REDIS_CLIENT')
        private redis: RedisClientType,
        @Inject('CAREGIVER_REPOSITORY')
        private careGiverRepository: Repository<CareGiver>,
        @Inject('DATA_SOURCE')
        private dataSource: DataSource,
        private schedulerRegistry: SchedulerRegistry
    ) { }

    @Cron(CronExpression.EVERY_30_SECONDS, {
        name: 'countSearchedKeyWord',
        timeZone: 'Asia/Seoul'
    })
    //많이 검색한 단어 집계
    async countSearchedKeyWord() {
        // 검색한 횟수가 5회 미만인 단어가 6개 이상이면 노출 그렇지 않으면
        // 이전 인기 키워드 노출하지만 이 전에 집계된 키워드들을 지우지 않음
        const _mostSearchedList: Array<string> =
            await this.redis.sendCommand(
                ['ZREVRANGEBYSCORE', 'count.searched.keywords', '+inf', '(0', 'LIMIT', '0', '6']
            );
        // 6개 미만이면 계속 수집하던 내용은 남겨두고
        //각 사용자가 검색했던 내용은 지움
        if (_mostSearchedList.length >= 5) {
            //업데이트 되면 마지막으로 업데이트 되는시간 저장
            const _lastUpdateTime = this._getMostKeyWordsUpdateTime('count');
            //가장 많이 검색된 키워드들 저장
            await this.redis.SET(
                'most.searched.keywords', JSON.stringify(_mostSearchedList)
            );
            //UPDATE TIME 저장
            await this.redis.SET(
                'most.searched.keywords.update.time', _lastUpdateTime
            )
            //UPDATE되었으면 이전 저장된 키워드들 삭제
            await this.redis.UNLINK('count.searched.keywords');
        }
        //지금까지 집계했던 사용자들의 키워드 삭제
        await this.redis.UNLINK('user.searched');
    }

    //Functions
    _getMostKeyWordsUpdateTime(path: string): string {
        //새로 업데이트 되었으면 해당 업데이트 시간 저장
        const _job = path === 'count' ?
            this.schedulerRegistry.getCronJob('countSearchedKeyWord') :
            this.schedulerRegistry.getCronJob('countViewedProfile')

        const _jobLastDateUTC = _job.lastDate();
        let _jobLastDate = _jobLastDateUTC.toLocaleString('en', {
            hourCycle: 'h23',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Seoul'
        });
        _jobLastDate = _jobLastDate.replace('/', '.');
        _jobLastDate = _jobLastDate.replace(',', '');
        return _jobLastDate;
    }

    @Cron(CronExpression.EVERY_30_SECONDS, {
        name: 'countViewedProfile',
        timeZone: 'Asia/Seoul'
    })
    //많이 조회한 프로필 집계
    async countViewedProfile() {
        //10위 순위까지 뽑아온다
        const _mostViewedList: Array<string> = await this.redis.sendCommand(
            ['ZREVRANGEBYSCORE', 'count.viewed.profiles', '+inf', '(0', 'LIMIT', '0', '5']
        );
        //10명이 뽑혔을 경우 데이터 뽑기
        if (_mostViewedList.length >= 5) {
            //리스트 안에 있는 profileId에 해당하는 유저 정보 가져오기
            const _findUser = await this.careGiverRepository
                .createQueryBuilder('cg')
                .innerJoin('cg.user', 'user')
                .select([
                    'cg.id as profileId',
                    'user.name as name',
                    'cg.keywords as keywords'
                ])
                .where('cg.id IN (:...ids)', { ids: _mostViewedList })
                .getRawMany();

            //순위대로 배열 다시 셋팅
            let rank = [];
            for (let i = 0; i < _mostViewedList.length; i++) {
                for (let j = 0; j < _findUser.length; j++) {
                    if (_mostViewedList[i] == _findUser[j].profileId) {
                        rank.push(_findUser[j]);
                        continue;
                    }
                }
            }

            const _lastUpdateTime = this._getMostKeyWordsUpdateTime('view');
            await this.redis.SET(
                'most.viewed.profiles', JSON.stringify(rank)
            );
            await this.redis.SET(
                'most.viewed.profiles.update.time', _lastUpdateTime
            );
            await this.redis.UNLINK('count.viewed.profiles');
        }
        //지금까지 어떤 사용자가 어떤 프로필을 조회했는지 삭제
        await this.redis.UNLINK('user.viewed');
    }

   /*  @Cron(CronExpression.EVERY_10_HOURS, {
        name: 'loadMessageData',
        timeZone: 'Asia/Seoul'
    })
    async loadMessageToMysql() {

        try {
            await this.dataSource.query(
                `LOAD DATA INFILE 
                'C:/Users/user/backend/backend/chat_files/messages.txt' 
                INTO TABLE message 
                FIELDS TERMINATED BY '    ' 
                LINES TERMINATED BY '\r\n' 
                IGNORE 1 LINES
                (room_id, type, content, send_date, send_id)
                `
            );
            fs.unlink('./chat_files/messages.txt', (err) => {
                if( err )
                    console.log('unlink error: ', err);
            });
        }

        catch(err) {
            console.log('load data infile error: ', err);
            return;
        }
    } */
}
