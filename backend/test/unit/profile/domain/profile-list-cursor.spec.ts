import { ObjectId } from "mongodb";
import { Sort } from "src/profile/domain/enum/sort.enum";
import { CaregiverProfileListData } from "src/profile/domain/profile-list-data";
import { ProfileListQueryOptions } from "src/profile/domain/profile-list-query-options";
import { ProfileListCursor } from "src/profile/domain/profile-list.cursor"
import { ProfileSort } from "src/profile/domain/profile-sort";

describe('프로필 리스트 커서 객체 Test', () => {
    let cursor: ProfileListCursor;

    describe('기본 정렬 이외에 다른 정렬과 함께 결합됐을 때', () => {
        it('각 정렬의 커서값과 결합된 정렬인지 확인하는 Method 확인', () => {
            const [paySortCursor, defaultSortCursor] = [20, new ObjectId().toHexString()];

            cursor = ProfileListCursor.of(`${paySortCursor}_${defaultSortCursor}`);

            expect(cursor.combinedOtherSortNext()).toBe(paySortCursor); // 다른 정렬 조건
            expect(cursor.combinedDefaultSortNext()).toBe(defaultSortCursor); // 기본 정렬 조건
        });
    });

    describe('어떤 정렬 조건 없이 기본 정렬만 수행되었을 때', () => {
        it.each([
            undefined,
            new ObjectId().toHexString() 
        ])('%s가 그대로 반환되어야 하고, 결합된 정렬이 아닌 결과를 반환', (next) => {
            cursor = ProfileListCursor.of(next);
 
            expect(cursor.defaultSortNext()).toBe(next);
        })
    })

    describe('클라이언트에게 넘겨줄 NextCursor Test', () => {
        describe('createNextCursor()', () => {
            it('반환되는 프로필이 없다면 null값이 생성되어야 한다', () => {
                const profileList = [];
                const result = ProfileListCursor.createNextCursor(profileList, {} as ProfileListQueryOptions);

                expect(result).toBeInstanceOf(ProfileListCursor);
                expect(result.toClientNext()).toBe(null);
            });

            it('마지막 프로필의 id와 정렬 옵션의 마지막 값이 조합되어 생성되어야 한다', () => {
                const profileList = [ {profile: { id: 1, pay: 50 }} ] as unknown as CaregiverProfileListData[];

                const queryOptions = new ProfileListQueryOptions(undefined, new ProfileSort(Sort.LowPay), undefined);
                const expectedCursor = `${profileList[0].pay}_${profileList[0].id}`
                
                const result = ProfileListCursor.createNextCursor(profileList, queryOptions);
                expect(result.toClientNext()).toBe(expectedCursor)
            })
        })
    })
})