import { ProfileViewRankRepository } from "src/rank/infra/profile-view-rank.repository";

export const MockProfileViewRankRepository = {
    provide: ProfileViewRankRepository,
    useValue: {
        increment: jest.fn()
    }
}