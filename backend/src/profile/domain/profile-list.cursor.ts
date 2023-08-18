export class ProfileListCursor {
    private next?: string;

    constructor(next?: string) { this.next = next; };

    /* 기본 최신순 제외하고 다른 정렬이 선택됐는지 */
    hasCombinedSortConditions(): boolean { return this.next && this.next.includes('_') };

    /* 기본 정렬 제외한 다른 정렬의 시작 커서 값 */
    combinedOtherSortNext(): number { return parseInt( this.next.split('_')[0] ); };

    /* 기본 정렬의  */
    combinedDefaultSortNext(): string { return this.next.split('_')[1]; };

    /* 다음 프로필 아이디 */
    defaultSortNext(): string | undefined { return this.next; };

    static of(next?: string): ProfileListCursor { return new ProfileListCursor(next); };
}