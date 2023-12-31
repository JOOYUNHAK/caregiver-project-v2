import { ObjectId } from "mongodb";
import { MongoQueryFactory, Operator } from "src/util/mongodb/mongo-query.factory";

class TestQueryFactory extends MongoQueryFactory {};

describe('MongoDB의 Query를 생성해주는 추상클래스 Test', () => {
    const queryFactory = new TestQueryFactory();

    describe('orderBy()', () => {
        it.each([
            ['age', 'DESC'],
            ['pay', 'ASC']
        ])('%s 필드를 %s로 정렬하는 쿼리 생성 확인', (field, sort) => {
            const expectedQuery = { [field]: sort === 'DESC' ? -1 : 1 };
            const resultQuery = queryFactory.orderBy(field, sort as any);
            
            expect(resultQuery).toEqual(expectedQuery);
        });
    });

    describe('equals()', () => {
        it.each([
            ['age', 20],
            ['isPrivate', false],
            ['notice', '공지확인'],
        ])('%s 필드가 %s와 일치하는지 쿼리 생성 확인', (field, value) => {
            const expectedQuery = { [field]: value };
            const resultQuery = queryFactory.equals(field, value);

            expect(resultQuery).toEqual(expectedQuery);
        });

        it('_id 필드면 ObjectId 값으로 변환하여 일치하는 쿼리 생성 확인', () => {
            const id = new ObjectId().toHexString();

            const expectedQuery = { _id: new ObjectId(id) };
            const resultQuery = queryFactory.equals('_id', id);

            expect(resultQuery).toEqual(expectedQuery);
        });

        it.each([
            null, undefined, NaN
        ])('값이 %s면 쿼리 생성을 하지 않고 null 반환 확인', (value) => {
            const resultQuery = queryFactory.equals('age', value);

            expect(resultQuery).toBe(null);
        });

        it('연산자들이 와도 정상적으로 결합하여 반환되는지 확인', () => {
            const ltThan = { $lt: 70 };
            const gtThan = { $gt: 80 };
            const field = 'age';

            const expectedQuery = { 'age': { ...ltThan, ...gtThan }};
            const resultQuery = queryFactory.equals(field, { ...ltThan, ...gtThan });
            expect(resultQuery).toEqual(expectedQuery);
        })
    });

    describe('ltThan()', () => {
        it('주어진 조건과 함께 $lt 쿼리가 생성되는지 확인', () => {
            const [field, value] = ['age', 20];
            const expectedQuery = { [field]: { $lt: value }};

            const resultQuery = queryFactory.ltThan(field, value);
            expect(resultQuery).toEqual(expectedQuery);
        });
    });

    describe('select()', () => {
        it('알맞은 select 쿼리가 생성되는지 확인', () => {
            const field = 'field';
            const expectedQuery = { [field]: 1 };

            const resultQuery = queryFactory.select(field);
            expect(resultQuery).toEqual(expectedQuery);
        });
    });

    describe('operator()', () => {
        it.each([
            ['lt', 70],
            ['gt', 80],
            ['in', [1, 2, 3]]   
        ])('%s 연산자와 알맞은 값 %s으로 쿼리가 생성되는지 확인', (operator, value) => {
            const expectedQuery = { [`\$${operator}`]: value };

            const resultQuery = queryFactory.operator(operator as Operator, value);
            expect(resultQuery).toEqual(expectedQuery);
        });

        it.each([
            undefined,
            NaN
        ])('%s이 값으로 왔을 때 Null 값을 반환하는지 확인', (value) => {
            const resultQuery = queryFactory.operator('ne', value);

            expect(resultQuery).toBe(null);
        })
    });

    describe('combineOperators()', () => {
        it('연산자로 null값이 반환된 값들은 제외하고 생성', () => {
            const ltThan = { '$lt': 30 };
            const resultQuery = queryFactory.combineOperators(null, ltThan);
            const expectedQuery = { ...ltThan };
            
            expect(resultQuery).toEqual(expectedQuery);
        });

        it('모든 연산자들이 null값으로 반환되었다면 null로 반환하는지 확인', () => {
            const resultQuery = queryFactory.combineOperators(null, null, null);

            expect(resultQuery).toBe(null);
        });

        it('정상적인 연산 조건들이 들어왔을 때 정상 작동하는지 확인', () => {
            const ltThan = { '$lt': 30 };
            const gtThan = { '$gt': 40 };
            const expectedQuery = { ...ltThan, ...gtThan };
            const resultQuery = queryFactory.combineOperators(ltThan, gtThan);
            
            expect(resultQuery).toEqual(expectedQuery);
        })
    })
})