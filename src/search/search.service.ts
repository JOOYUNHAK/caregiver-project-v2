import { Inject, Injectable } from "@nestjs/common";
import { RedisClientType } from "redis";
import { CareGiver } from "src/auth/entity/register.entity";
import { User } from "src/auth/entity/user.entity";
import { convertStringToLikeQuery, getStartEndYear } from "src/auth/user.service";
import { Heart } from "src/user/entity/heart.entity";
import { Brackets, Repository } from "typeorm";
import { SearchProfileListDto } from "./dto/search-profile-list.dto";
import { SearchProfileDto } from "./dto/search-profile.dto";

@Injectable()
export class SearchService {
    constructor(
        @Inject('CAREGIVER_REPOSITORY')
        private careGiverRepository: Repository<CareGiver>,
        @Inject('HEART_REPOSITORY')
        private heartRepository: Repository<Heart>,
        @Inject('REDIS_CLIENT')
        private redis: RedisClientType

    ) { }

    async getSearchProfile(searchProfileDto: SearchProfileDto): Promise<SearchProfileListDto[]> {
        const { keyWord, start, mainFilter, payFilter, startDateFilter, sexFilter,
            ageFilter, areaFilter, licenseFilter, warningFilter, strengthFilter } = searchProfileDto;

        let query, searchCount, searchResult;

        if (mainFilter === 'heart') {
            //찜 많은 순으로 정렬하면 해당 쿼리문 작성
            const _heartCountSubQuery = this.heartRepository
                .createQueryBuilder()
                .subQuery()
                .select([
                    'heart.heart_id as heartId',
                    'COUNT(heart.heart_id) AS count'
                ])
                .from(Heart, 'heart')
                .groupBy('heartId')
                .getQuery();

            //아이디별 찜 갯수 leftJoin
            query = this.careGiverRepository
                .createQueryBuilder('cg')
                .innerJoin('cg.user', 'user')
                .leftJoin(_heartCountSubQuery, 'heart', 'heart.heartId = cg.id')
                .addSelect([
                    'heart.count as count'
                ])
        } else {
            //일반 정렬이면 유저테이블이랑만 join
            query = this.careGiverRepository
                .createQueryBuilder('cg')
                .innerJoin('cg.user', 'user')
        }

        query = await query
            .select([
                'cg.id as id',
                'cg.career as career',
                'cg.pay as pay',
                'cg.startDate as startDate',
                'cg.possibleArea as possibleArea',
                'cg.license as license',
                'cg.keywords as keywords',
                'cg.notice as notice',
                'user.name as name',
                'user.birth as birth',
                'user.purpose as purpose',
                'user.sex as sex',
                'user.isCertified as isCertified',
                'user.warning as warning',
            ])
            .where('user.profile_off = :profile_off AND LOCATE(:keyword, keywords)', {
                profile_off: false,
                keyword: keyWord
            })
            .andWhere(
                new Brackets((qb) => {
                    //일당 필터
                    if (!!payFilter) {
                        qb.andWhere('cg.pay <= :pay', {
                            pay: payFilter === 'under10' ? 10 :
                                payFilter === 'under15' ? 15 : 20
                        })
                    }
                    //시작가능일 필터
                    if (!!startDateFilter) {
                        qb.andWhere('cg.startDate <= :startDate', {
                            startDate: startDateFilter === 'immediately' ? 1 : startDateFilter === '1week' ? 2
                                : startDateFilter === '2week' ? 3 : startDateFilter === '3week' ? 4 : 5
                        })
                    }
                    //나이 필터
                    if (!!ageFilter) {
                        const { startAge, endAge } = getStartEndYear(ageFilter);
                        qb.andWhere('user.birth between :startAge and :endAge', {
                            startAge: endAge, endAge: startAge
                        })
                    }
                    //성별 필터
                    if (!!sexFilter) {
                        qb.andWhere('user.sex = :sex', { sex: sexFilter === '남' ? '남' : '여' });
                    }
                    //지역 필터
                    if (!!areaFilter) {
                        const areaList = convertStringToLikeQuery(areaFilter);

                        //첫번째 쿼리문 무조건 필터 한개는 들어오기
                        switch (areaList.length) {
                            case 1:
                                qb.andWhere('cg.possibleArea like :area', { area: areaList[0] });
                                break;
                            case 2:
                                qb.andWhere(new Brackets((sub) => {
                                    sub.where('cg.possibleArea like :firstArea ', { firstArea: areaList[0] })
                                        .orWhere('cg.possibleArea like :secondArea', { secondArea: areaList[1] });
                                }))
                                break;
                            case 3:
                                qb.andWhere(new Brackets((sub) => {
                                    sub.where('cg.possibleArea like :firstArea ', { firstArea: areaList[0] })
                                        .orWhere('cg.possibleArea like :secondArea', { secondArea: areaList[1] })
                                        .orWhere('cg.possibleArea like :thirdArea', { thirdArea: areaList[2] });
                                }))
                                break;
                        }
                    }
                    //자격증 필터
                    if (!!licenseFilter) {
                        const licenseList = convertStringToLikeQuery(licenseFilter);

                        switch (licenseList.length) {
                            case 1:
                                qb.andWhere('cg.license like :license', { license: licenseList[0] });
                                break;
                            case 2:
                                qb.andWhere(new Brackets((sub) => {
                                    sub.where('cg.license like :firstLicense ', { firstLicense: licenseList[0] })
                                        .orWhere('cg.license like :secondLicense', { secondLicense: licenseList[1] });
                                }))
                                break;
                            case 3:
                                qb.andWhere(new Brackets((sub) => {
                                    sub.where('cg.license like :firstLicense ', { firstLicense: licenseList[0] })
                                        .orWhere('cg.license like :secondLicense', { secondLicense: licenseList[1] })
                                        .orWhere('cg.license like :thirdLicense', { thirdLicense: licenseList[2] });
                                }))
                                break;
                        }
                    }
                    //경고받은 사람 제외
                    if (!!warningFilter) {
                        qb.andWhere('user.warning is null')
                    }
                    //강점 미작성 한 사람 제외
                    if (!!strengthFilter)
                        qb.andWhere('cg.strength != :strength', { strength: '{"first":"","second":""}' })
                    /* if( !!exceptLicenseFilter)
                        qb.andWhere('cg.license is not null') */
                })
            )
            .orderBy(
                mainFilter === 'pay' ? 'cg.pay' :
                    mainFilter === 'startDate' ? 'cg.startDate' :
                        mainFilter === 'heart' ? 'heart.count' : null,

                mainFilter === 'pay' || mainFilter === 'startDate' ? 'ASC' : 'DESC'
            )

        //5개씩 프로필 넘겨준다
        searchResult = await query
            .offset(start)
            .limit(5)
            .getRawMany();

        //검색 만족하는 총 갯수만 넘겨주고 
        //각각의 요청에 요청받은 프로필 갯수만 넘겨줌
        if ( !Number(start) ) {
            searchCount = await query
                .select('COUNT(cg.id) as count')
                .getRawOne();        
        }

        searchResult = [[...searchResult], [searchCount]];

        return searchResult;
    }

    async storeSearchKeyWord( id: string, keyWord: string ) {
        const _searchedKey = keyWord + ':' + id; //어떤 사용자가 어떤 키워드를 검색했는지 key
        const _isSearched = await this.redis.SISMEMBER('user.searched', _searchedKey);
        //만약 해당 유저가 해당 키워드를 검색한 적 없으면 해당 키워드 count 하나 증가
        if( ! _isSearched) {
            //hscan 으로 key 값을 늘리는 방법도 생각
            this.redis.ZINCRBY('count.searched.keywords', 1, keyWord);
        }
        //해당 아디이가 검색한 key값 저장
        this.redis.SADD('user.searched', _searchedKey);
    }

    async getMostSearched(): Promise<(string|string[])[]> {
        let _mostSearchedKeyWords = await this.redis.GET('most.searched.keywords');
        const _keyWordsUpdateTime = await this.redis.GET('most.searched.keywords.update.time');
        _mostSearchedKeyWords = JSON.parse(_mostSearchedKeyWords);
        return [
            [..._mostSearchedKeyWords],
            _keyWordsUpdateTime
        ]
    }
}


