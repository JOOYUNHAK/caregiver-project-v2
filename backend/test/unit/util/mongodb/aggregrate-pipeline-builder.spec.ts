import { AggregratePipelineBuilder } from "src/util/mongodb/aggregrate-pipeline.builder";

describe('AggregratePipelineBuilder() Test', () => {

    describe('match()', () => {
        it('중간에 null인 쿼리가 있다면 제외하고 match 스테이지를 만드는지 확인', () => {
            const ageQuery =  { 'age': 70 };
            const payQuery =  { 'pay': { $lt: 80 }};
            const privateQuery = { 'isPrivate': false };

            const expected = [{ $match: { ...ageQuery, ...payQuery, ...privateQuery }}];
            const result = AggregratePipelineBuilder
                        .initialize()
                        .match(ageQuery, null, payQuery, privateQuery)
                        .build();
            
            expect(result).toEqual(expected);
        });
    });

    describe('sort()', () => {
        it('주어진 정렬 조건대로 sort 스테이지를 만드는지 확인', () => {
            const paySort = { pay: 1 };
            const ageSort = { age: -1 };
            
            const expected = [{ $sort: { ...paySort, ...ageSort } }];
            const result = AggregratePipelineBuilder
                        .initialize()
                        .sort(paySort, ageSort)
                        .build();
            
            expect(result).toEqual(expected);
        });
    });

    describe('project()', () => {
        it('select한 필드를 모두 합쳐 project 스테이지를 만드는지 확인', () => {
            const userSelectQuery = { userId: 1 };
            const noticeSelectQuery = { notice: 1 };

            const expected = [{ $project: { ...userSelectQuery, ...noticeSelectQuery } }];
            const result = AggregratePipelineBuilder
                        .initialize()
                        .project(userSelectQuery, noticeSelectQuery)
                        .build();
            
            expect(result).toEqual(expected);
        })
    })
})