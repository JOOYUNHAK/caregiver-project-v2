import { ProfileViewRankService } from "src/rank/application/service/profile-view-rank.service";

/* MockingProfileViewRankService */
export const MockProfileViewRankService = {
    provide: ProfileViewRankService,
    useValue: {
        increment: jest.fn()
    }
}