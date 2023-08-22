import { plainToInstance } from "class-transformer"
import { ObjectId } from "mongodb"
import { PossibleDate } from "src/profile/domain/enum/possible-date.enum"
import { Sort } from "src/profile/domain/enum/sort.enum"
import { ProfileFilter } from "src/profile/domain/profile-filter"
import { ProfileListQueryOptions } from "src/profile/domain/profile-list-query-options"
import { ProfileListCursor } from "src/profile/domain/profile-list.cursor"
import { ProfileSort } from "src/profile/domain/profile-sort"
import { ProfileQueryFactory } from "src/profile/infra/repository/profile-query.factory"
import { SEX } from "src/user-auth-common/domain/enum/user.enum"

describe('ProfileQueryFactory Test', () => {
    const queryFactory = new ProfileQueryFactory();

    describe('정렬 조건이 없는 경우', () => {
        it('필터 중 동적쿼리를 통해 정확한 Pipeline이 생성되는지 확인', () => {
            const filter = plainToInstance(
                ProfileFilter,
                { age: 50, sex: SEX.MALE, pay: 20 },
            );

            const listQueryOptions = new ProfileListQueryOptions(
                new ProfileListCursor(), new ProfileSort(), filter
            );
            const expectedPipeline = [
                {
                    $match:
                    {
                        isPrivate: false,
                        pay: { '$lte': 20 },
                        sex: SEX.MALE,
                        age: { '$gte': 50, '$lt': 60 }
                    }
                },
                {
                    $sort: { _id: -1 }
                },
                {
                    $project: {
                        _id: 0,
                        age: 1,
                        career: 1,
                        id: { $toString: "$_id" },
                        name: 1,
                        notice: 1,
                        pay: 1,
                        possibleAreaList: 1,
                        possibleDate: 1,
                        sex: 1,
                        tagList: 1,
                        userId: 1,
                    },
                }
            ];

            const resultPipeline = queryFactory.listPipeline(listQueryOptions);
            expect(resultPipeline).toEqual(expectedPipeline);
        })
    });

    describe('정렬 조건이 있는 경우', () => {
        it('Next Cursor가 없는 경우(첫 요청) Pipeline 확인', () => {
            const sortOption = new ProfileSort(Sort.LowPay);
            const filter = plainToInstance(
                ProfileFilter,
                { startDate: PossibleDate.WITHIN1MONTH }
            )
            const listQueryOptions = new ProfileListQueryOptions(
                new ProfileListCursor(), sortOption, filter
            );
            const expectedPipeline = [
                {
                    $match:
                    {
                        isPrivate: false,
                        possibleDate: { $lte: PossibleDate.WITHIN1MONTH }
                    }
                },
                {
                    $sort: { pay: 1, _id: -1 }
                },
                {
                    $project: {
                        _id: 0,
                        age: 1,
                        career: 1,
                        id: { $toString: "$_id" },
                        name: 1,
                        notice: 1,
                        pay: 1,
                        possibleAreaList: 1,
                        possibleDate: 1,
                        sex: 1,
                        tagList: 1,
                        userId: 1,
                    },
                }
            ];
            const resultPipeline = queryFactory.listPipeline(listQueryOptions);
            expect(resultPipeline).toEqual(expectedPipeline)
        });

        it('다음 커서가 있을 때 생성되는 Pipeline 확인', () => {
            const nextPay = 5;
            const nextProfileId = new ObjectId().toHexString();
            const nextCursor = `${nextPay}_${nextProfileId}`;
            
            const sortOption = new ProfileSort(Sort.LowPay);
            const listQueryOptions = new ProfileListQueryOptions(
                new ProfileListCursor(nextCursor), new ProfileSort(Sort.LowPay), new ProfileFilter()
            );

            const expectedPipeline = [
                {
                    $match: {
                        isPrivate: false,
                        $or: [
                            { pay: { $gt: nextPay } },
                            { pay: nextPay, _id: { $lt: new ObjectId(nextProfileId) }}
                        ]
                    },
                },
                {
                    $sort: { pay: 1, _id: -1 }
                },
                {
                    $project: {
                        _id: 0,
                        age: 1,
                        career: 1,
                        id: { $toString: "$_id" },
                        name: 1,
                        notice: 1,
                        pay: 1,
                        possibleAreaList: 1,
                        possibleDate: 1,
                        sex: 1,
                        tagList: 1,
                        userId: 1,
                    },
                }
            ];
            const resultPipeline = queryFactory.listPipeline(listQueryOptions);
            expect(resultPipeline).toEqual(expectedPipeline);
        })
    })
})