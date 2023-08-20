import { CaregiverProfileListData } from "./profile-list-data";
import { ProfileListQueryOptions } from "./profile-list-query-options";

export class ProfileListCursor {
    private next?: string;

    constructor(next?: string) { this.next = next; };

    /* 기본 정렬 제외한 다른 정렬의 시작 커서 값 */
    combinedOtherSortNext(): number { return parseInt( this.next.split('_')[0] ); };

    /* 기본 정렬의  */
    combinedDefaultSortNext(): string { return this.next.split('_')[1]; };

    /* 요청에서 넘어온 cursor 값 */
    defaultSortNext(): string | undefined { return this.next; };

    /* 클라이언트에게 넘겨줄 cursor 값 */
    toClientNext(): string | null { return this.next; };

    /* 다음 커서 생성 */
    static createNextCursor(
        profileList: CaregiverProfileListData [],
        queryOptions: ProfileListQueryOptions
    ) {
        if( !profileList.length ) return new ProfileListCursor(null);
        
        const lastProfile = profileList.at(-1);
        
        let nextCursor = queryOptions.getSortOptions().hasOptions() ? 
                this.createCombinedCursor(lastProfile, queryOptions.getSortOptions().otherField()) : lastProfile.profile.id;
        
        return new ProfileListCursor(nextCursor)
    }

    private static createCombinedCursor(lastProfile: CaregiverProfileListData, otherSortField: string) {
        const otherSortFieldLastValue = otherSortField === 'pay' ? 
            lastProfile.profile.pay : lastProfile.profile.possibleDate;
        return `${otherSortFieldLastValue}_${lastProfile.profile.id}`;
    }

    /* 테스트용 */
    static of(next?: string): ProfileListCursor { return new ProfileListCursor(next); };
}