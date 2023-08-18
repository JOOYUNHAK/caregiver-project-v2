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
        
        const matchStage = { $match: { ...matchQuery } };
        this.addStage(matchStage);         
        return this;
    };

    /**
     * 정렬 쿼리들을 합쳐 Sort 스테이지를 생성
     * @param sortQueries 정렬 쿼리들
     */
    sort(...sortQueries: any[]): this {
        const sortQuery = this.toCombinedQuery(sortQueries);
        
        const sortStage = { $sort: { ...sortQuery } };
        this.addStage(sortStage);
        return this;
    };

    /**
     * 선택 쿼리들을 합쳐 Project 스테이지를 생성
     * @param selectQueries select 쿼리들
     */
    project(...selectQueries: any[]): this {
        const selectQuery = this.toCombinedQuery(selectQueries);
        
        const projectStage = { $project: { ...selectQuery } };
        this.addStage(projectStage);
        return this;
    };

    build(): any[] { return this.pipeline; };

    /* pipeline에 인자로 받은 스테이지 추가 */
    private addStage(stage: Object) { this.pipeline.push(stage); };

    /* 하나의 조건으로 만들어주는 메서드 */
    private toCombinedQuery(queryArr: any[]) {
        return queryArr.reduce((combinedQuery, query) => ({
            ...combinedQuery,
            ...query
        }), {});
    }
}