import { ProfileViewRankManager } from "src/rank/application/service/profile-view-rank.manager";
import { ProfileViewRankService } from "src/rank/application/service/profile-view-rank.service";

/* MockingProfileViewRankService */
export const MockProfileViewRankService = {
    provide: ProfileViewRankService,
    useValue: {
        increment: jest.fn()
    }
};

/* Mocking ProfileViewRankManager */
export const MockProfileViewRankManager = {
    provide: ProfileViewRankManager,
    useValue: {
        recordUserAction: jest.fn(),
        isActionPerformedByUser: jest.fn()
    }
}