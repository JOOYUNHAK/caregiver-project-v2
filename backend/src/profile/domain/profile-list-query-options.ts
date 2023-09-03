import { ProfileFilter } from "src/profile/domain/profile-filter";
import { ProfileListCursor } from "src/profile/domain/profile-list.cursor";
import { ProfileSort } from "./profile-sort";

export class ProfileListQueryOptions {
    private nextCursor?: ProfileListCursor; // 다음번 조회의 기준 커서
    private sort?: ProfileSort; // 정렬 기준
    private filters?: ProfileFilter  // 필터들
 
    getNextCursor(): ProfileListCursor { return this.nextCursor; }; 
    getSortOptions(): ProfileSort | undefined { return this.sort; };
    hasSortOptions(): boolean { return this.sort ? true : false }; // 기본 최신순을 제외한 정렬 옵션이 있는지
    getFilters(): ProfileFilter { return this.filters; };
    
    constructor(next?: ProfileListCursor, sort?: ProfileSort, filters?: ProfileFilter) {
        this.nextCursor = next;
        this.sort = sort;
        this.filters = filters;
    };
}