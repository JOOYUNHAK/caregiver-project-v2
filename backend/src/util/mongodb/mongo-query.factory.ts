import { ObjectId } from "mongodb";

export abstract class MongoQueryFactory {
    /**
     * 원하는 필드 기준에 맞게 정렬하는 Query 생성
     * @param field 정렬하고자 하는 필드
     * @param by 정렬기준
     */
    orderBy(field: string, by: 'DESC' | 'ASC'): MongoQuery<number> {
        return {
            [field]: by ==='DESC' ? -1 : 1
        }
    };

    /**
     * 원하는 필드에 값과 일치하는 Query 생성
     * string이면서 _id필드를 찾는다면 ObjectId로 변경
     * @param field 일치 필드
     * @param value 찾고자 하는 값
     */
    equals(field: string, value: string | boolean | number | null | undefined):
        MongoQuery<string | boolean | number | ObjectId | null>  | null
    {
        if( value === undefined ) return null;

        return {
            [field]: ( field === '_id' && typeof(value) === 'string' ) ? new ObjectId(value) : value
        }
    }

    /**
     * 파라미터로 넘긴 값보다 작은 값을 찾는 Query 생성
     * 없으면 null 해당 조건 무시
     * @param field 찾고자 하는 필드
     * @param value 기준 값
     */
    ltThan(field: string, value: number | string | undefined): 
        MongoQuery<number | string | ObjectId> | null 
    {
        if ( !value ) return null;

        return {
            [field]: {
                $lt: field === '_id' ? new ObjectId(value) : value
            }   
        }
    };

    /**
     * 결과에 포함시킬 필드 쿼리 생성
     * @param field 결과에 포함시킬 필드
     */
    select(field: string): MongoQuery<number> {
        return {
            [field]: 1
        }
    }

    /**
     * 저장 값 중 빈 배열이 
     * 아닌 Document만 찾아주는 Query 생성
     * @param field 찾고자하는 필드
     */
    notEmptyArray (field: string): MongoQuery<[]> {
        return {
            [field] : { $ne: [] }
        }
    }

    /**
     * 연산자 조건만 생성
     * @param operator 연산자
     * @param value 값
     * @example ('ne', 70) => {$ne: 70}
     */
    operator<T>(operator: string, value: T | T []): MongoOperator<T> | null {
        if( value === undefined || Number.isNaN(value) ) return null;

        return { [`\$${operator}`]: value };
    }

    /**
     * 하나의 필드에 여러개의 연산자를 적용하기 위한 메서드
     * @param field 여러개의 연산자를 적용하고자 하는 필드
     * @param operators operator()를 사용하여 나온 연산자
     */
    withOperators<T>(field: string, ...operators: MongoOperator<T>[]): MongoQuery<MongoOperator<T>> | null{
        operators = operators.filter((operator) => operator);

        if( !operators.length ) return null;

        const completedOperator = operators.reduce(
            (combinedOperator, operator) => ({
            ...combinedOperator,
            ...operator
        }), {});
        
        return { 
            [field]: completedOperator
        }
    }

    /**
     * 저장된 배열 값 중 찾고자 하는 값과 
     * 하나라도 일치하는 Document 찾아주는 Query 생성
     * @param field 찾고자하는 필드
     * @param value 찾을 배열 값
     */
    matchAnyElementInArray<T>(field: string, value: T [] | undefined): MongoQuery<T []> | null {
        if( !value ) return null;

        return {
            [field]: {
                $in: value
            }
        }
    }
}

export type MongoOperator<T> = {
    [operator: string]: T | T[]
};
export type MongoQuery<T> = {
    [field: string]: MongoOperator<T> | T 
};