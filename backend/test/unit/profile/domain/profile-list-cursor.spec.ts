import { ObjectId } from "mongodb";
import { ProfileListCursor } from "src/profile/domain/profile-list.cursor"

describe('프로필 리스트 커서 객체 Test', () => {
    let cursor: ProfileListCursor;

    describe('기본 정렬 이외에 다른 정렬과 함께 결합됐을 때', () => {
        it('각 정렬의 커서값과 결합된 정렬인지 확인하는 Method 확인', () => {
            const [paySortCursor, defaultSortCursor] = [20, new ObjectId().toHexString()];

            cursor = ProfileListCursor.of(`${paySortCursor}_${defaultSortCursor}`);

            expect(cursor.hasCombinedSortConditions()).toBe(true); // 두개 이상의 조건
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
 
            expect(cursor.hasCombinedSortConditions()).toBeFalsy();
            expect(cursor.defaultSortNext()).toBe(next);
        })
    })
})