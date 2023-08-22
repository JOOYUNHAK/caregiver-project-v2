import { MongoQuery } from "./mongo-query.factory";

export class AggregratePipelineBuilder {
    private pipeline: any[];

    constructor() { this.pipeline = []; };

    static initialize() {
        return new AggregratePipelineBuilder();
    };

    /**
     * 연산 쿼리들을 합쳐 Match 스테이지를 생성
     * @param operationQueries 연산 쿼리들
     */
    match(...operationQueries: any[]): this {
        const matchQuery = this.toCombinedQuery(
            operationQueries.filter( query => query != null )
        )
        this.addQueryToStage('match', matchQuery);         
        return this;
    };

    /**
     * 정렬 쿼리들을 합쳐 Sort 스테이지를 생성
     * @param sortQueries 정렬 쿼리들
     */
    sort(...sortQueries: any[]): this {
        const sortQuery = this.toCombinedQuery(sortQueries);
        this.addQueryToStage('sort', sortQuery);
        return this;
    };

    /**
     * 선택 쿼리들을 합쳐 Project 스테이지를 생성
     * @param selectQueries select 쿼리들
     */
    project(...selectQueries: any[]): this {
        const selectQuery = this.toCombinedQuery(selectQueries);
        this.addQueryToStage('project', selectQuery)
        return this;
    };

    build(): any[] { return this.pipeline; };

    /* 하나의 조건으로 만들어주는 메서드 */
    private toCombinedQuery<T>(queryArr: any []): MongoQuery<T>[] {
        return queryArr.reduce((combinedQuery, query) => ({
            ...combinedQuery,
            ...query
        }), {});
    };

    private addQueryToStage<T>(stage: string, query: MongoQuery<T>[]) {
        const eachStage = { [`\$${stage}`]: { ...query } };
        this.pipeline.push(eachStage);
    }
}