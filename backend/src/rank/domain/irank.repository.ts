export interface IRankRepository {    
    /* 횟수 증가시키는 메서드 */
    increment(identify: string): Promise<void>
;}