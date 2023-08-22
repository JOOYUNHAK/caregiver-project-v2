import { Sort } from './enum/sort.enum'

export class ProfileSort {
    private by?: Sort;

    hasOption(): boolean { return this.by ? true : false; }; // 다른 정렬기준이 있는지

    getOption(): Sort { return this.by; };
    
    otherField(): string { return this.by === Sort.LowPay ? 'pay' : 'possibleDate'; }; // 다른 정렬 기준 필드
     
    otherFieldBy(): "DESC" | "ASC" { return "ASC"; }; // 다른 정렬 기준

    defaultField(): string { return '_id' }; // 기본 _id값 기준(생성일)

    defaultFieldBy(): "DESC" { return "DESC"; }; // 기본 최신순

    constructor(by?: Sort) { this.by = by; };
}