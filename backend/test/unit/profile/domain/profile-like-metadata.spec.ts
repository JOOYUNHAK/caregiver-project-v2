import { ProfileLike } from "src/profile/domain/entity/profile-like"
import { ProfileLikeMetadata } from "src/profile/domain/profile-like-metadata";

describe('ProfileLikeMetadata 객체 Test()', () => {
    it('자신이 조회한 내역이 있다면 찜 여부를 true로 반환하는지 확인', () => {
        const alreadyLikedProfile = new ProfileLike('', 1);
        const testLikeMetadata = new ProfileLikeMetadata(0, alreadyLikedProfile);
        expect(testLikeMetadata.getIsLike()).toBe(true);
    });

    it('자신이 조회한 내역이 없다면 찜 여부를 false로 반환하는지 확인', () => {
        const testLikeMetadata = new ProfileLikeMetadata(2, null);
        expect(testLikeMetadata.getIsLike()).toBe(false);
    });
})