import { ProfileListDataAsClient } from "./profile-list-data";
import { ProfileListQueryOptions } from "./profile-list-query-options";

export class ProfileListCursor {
    private next?: string;

    constructor(next?: string) { this.next = next; };
    
    /* 기본 정렬 제외한 다른 정렬의 시작 커서 값 */
    combinedOtherSortNext(): number | undefined { 
        return this.next ? parseInt( this.next.split('_')[0] ) : undefined;
    };

    /* 기본 정렬의  */
    combinedDefaultSortNext(): string | undefined { 
        return this.next ? this.next.split('_')[1] : undefined;
    };

    /* 요청에서 넘어온 cursor 값 */
    defaultSortNext(): string | undefined { return this.next; };

    /* 클라이언트에게 넘겨줄 cursor 값 */
    toClientNext(): string | undefined { return this.next; };

    /* 다음 커서 생성 */
    static createNextCursor(
        profileList: ProfileListDataAsClient [],
        queryOptions: ProfileListQueryOptions
    ) {
        if( !profileList.length ) return new ProfileListCursor(null);
        
        const lastProfile = profileList.at(-1);
        
        let nextCursor = queryOptions.getSortOptions().hasOption() ? 
                this.createCombinedCursor(lastProfile, queryOptions.getSortOptions().otherField()) : lastProfile.id;
        
        return new ProfileListCursor(nextCursor)
    }

    private static createCombinedCursor(lastProfile: ProfileListDataAsClient, otherSortField: string) {
        const otherSortFieldLastValue = otherSortField === 'pay' ? 
            lastProfile.pay : lastProfile.possibleDate;
        return `${otherSortFieldLastValue}_${lastProfile.id}`;
    }

    /* 테스트용 */
    static of(next?: string): ProfileListCursor { return new ProfileListCursor(next); };
}