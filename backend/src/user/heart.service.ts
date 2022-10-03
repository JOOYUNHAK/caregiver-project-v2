/* 찜 관련 로직 */
import { Inject, Injectable } from '@nestjs/common';
import { CareGiver } from 'src/auth/entity/register.entity';
import { User } from 'src/auth/entity/user.entity';
import { Repository } from 'typeorm'
import { HeartListDto } from './dto/heart-list.dto';
import { Heart } from './entity/heart.entity';

@Injectable()
export class HeartService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
        @Inject('HEART_REPOSITORY')
        private heartRepository: Repository<Heart>,
        @Inject('CAREGIVER_REPOSITORY')
        private careGiverRepository: Repository<CareGiver>
    ) { }
    
    //찜 목록 업데이트
    async updateHeartList(userId: string, profileId: number) {
        const userHeart = await this.heartRepository
            .createQueryBuilder('heart')
            .where('heart.user_id = :userId', { userId: userId })
            .andWhere('heart.heart_id = :profileId', { profileId: profileId })
            .getOne();
        /* 
            데이터가 많아졌을 때 시험해보기
        const exist = await this.heartRepository
            .createQueryBuilder('heart')
            .leftJoinAndSelect('heart.user_id', 'userId')
            .leftJoinAndSelect('heart.heart_id', 'profileId')
            .getOne(); */

        //이미 찜했던 대상인경우
        if (!!userHeart) {      
            await this.heartRepository
                .delete({
                    user_id: { id: userId },
                    heart_id: { id: profileId }
                })
        }
        //처음 찜하는 대상일경우
        else {
            await this.heartRepository
                .insert({
                    user_id: { id: userId },
                    heart_id: { id: profileId }
                })
        }
    }
    
    //찜 목록 받아오기
    async getHeartList(userId: string) : Promise<HeartListDto []> {
        return await this.heartRepository
            .createQueryBuilder('heart')
            .innerJoin('heart.heart_id', 'heartProfile')
            .innerJoin('heartProfile.user', 'user')
            .where('heart.user_id = :id', { id: userId })
            .addSelect([
                'user.purpose as purpose',
                'user.name as name',
                'user.sex as sex',
                'user.birth as birth',
                'user.isCertified as isCertified',
                'heartProfile.id as id',
                'heartProfile.career as career',
                'heartProfile.possibleArea as possibleArea',
                'heartProfile.pay as pay',
                'heartProfile.startDate as startDate',
                'heartProfile.keywords as keywords',
                'heartProfile.notice as notice'
            ])
            .getRawMany();
    }

    //찜 전체 초기화
    async resetHeartList(userId: string) {
        await this.heartRepository
            .createQueryBuilder('heart')
            .innerJoin('heart.user_id', 'user')
            .delete()
            .where('heart.user_id = :id', { id: userId })
            .execute()
    }
}