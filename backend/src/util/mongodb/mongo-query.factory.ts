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
     * @description null을 파라미터로 올 경우 해당 조건은 제외됩니다.
     */
    equals<T>(field: string, value: T | ObjectId):
        MongoQuery<T | MongoOperator<T> | ObjectId >  | null
    {
        if( value == undefined || value == null || Number.isNaN(value) ) return null;

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

    lteThan(field: string, value: number | string | undefined): 
        MongoQuery<number | string | ObjectId> | null 
    {
        if ( !value ) return null;

        return {
            [field]: {
                $lte: field === '_id' ? new ObjectId(value) : value
            }   
        }
    };

    /**
     * 파라미터로 넘긴 값보다 큰 값을 찾는 Query 생성
     * 없으면 null 해당 조건 무시
     * @param field 찾고자 하는 필드
     * @param value 기준 값
     */
    gtThan(field: string, value: number | string | undefined):
        MongoQuery<number | string | ObjectId> | null
    {
        if( !value ) return null;
        
        return {
            [field]: {
                $gt: field === '_id' ? new ObjectId(value) : value
            }   
        }
    }

    gteThan(field: string, value: number | string | undefined):
        MongoQuery<number | string | ObjectId> | null
    {
        if( !value ) return null;
        
        return {
            [field]: {
                $gte: field === '_id' ? new ObjectId(value) : value
            }   
        }
    }

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
     * 결과에 포함시키지 않을 필드 쿼리 생성
     * @param field 결과에 포함시킬 필드
     */
    exclude(field: string): MongoQuery<number> {
        return {
            [field]: 0
        }
    };

    /**
     * 결과로 반환되는 필드의 이름을 변경해주는 메서드
     * @param 바꾸기 전 필드 이름, 바꾸고 난 후 필드 이름
     */
    rename<T>(to: string, value: T | MongoOperator<T>): MongoQuery<T> {
        return {
            [to]: value
        }
    };

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
    operator<T>(operator: Operator, value: T | T []): MongoOperator<T> | null {
        if( value === undefined || Number.isNaN(value) ) return null;

        return { [`\$${operator}`]: value };
    }

    /**
     * 조합한 연산자들과 함께 $or 쿼리 생성
     * @param operators 조합할 연산자들
     */
    or(operators: any []) {
        operators = operators.filter( opeartor => opeartor );

        if( !operators.length ) return null; 

        return {
            $or: operators 
        }
    }
    /**
     * 여러개의 연산자를 조합하기 위해
     * @param operators 조합하고자 하는 연산자들
     */
    combineOperators(...operators: any [] ) {
        operators = operators.filter((operator) => operator);
        
        if( !operators.length ) return null;

        return operators.reduce(
            (combinedOperator, operator) => ({
            ...combinedOperator,
            ...operator
        }), {});
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
export type Operator =
    'lt' |
    'lte' |
    'gt' |
    'gte' |
    'in' | 
    'ne' |
    'or' |
    'toString'