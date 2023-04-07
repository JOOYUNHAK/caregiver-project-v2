import { Injectable, Inject } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CareGiver } from 'src/auth/entity/register.entity';

@Injectable()
export class ProfileService {
    constructor(
        @Inject('CAREGIVER_REPOSITORY')
        private careGiverRepository: Repository<CareGiver>
    ){}
    
    //회원가입 때 작성했던 프로필 내용 가져오기
    async getWrittenProfile(id: string, page: number) {
        console.log(page)
        const query = this.careGiverRepository
            .createQueryBuilder('cg')
            .innerJoin('cg.user', 'user')
            .where('user.id = :id', { id: id });

        return await this.getWrittenProfileQuery(query, page).getRawOne();
    }

    getWrittenProfileQuery( query: SelectQueryBuilder<CareGiver>, page:number ) {
        if( page == 1)
            return this.firstPageQuery(query);
        if( page == 2)
            return this.secondPageQuery(query);
        return this.lastPageQuery(query);
    }

    firstPageQuery( query: SelectQueryBuilder<CareGiver> ) {
        return query
            .select([
                'cg.weight as weight',
                'cg.career as career',
                'cg.pay as pay',
                'cg.startDate as startDate',
                'cg.nextHospital as nextHospital',
                'cg.possibleArea as possibleArea',
                'cg.license as license'
            ]);
    }

    secondPageQuery( query: SelectQueryBuilder<CareGiver> ) {
        return query
        .select([
            'cg.suction as suction',
            'cg.toilet as toilet',
            'cg.bedsore as bedsore',
            'cg.washing as washing',
            'cg.strength as strength',
            'cg.keywords as keywords',
        ]);
    }

    lastPageQuery( query: SelectQueryBuilder<CareGiver> ) {
        return query
        .select([
            'cg.notice',
            'cg.extraFee'
        ]);
    }

}