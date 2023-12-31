import { getRepositoryToken } from "@nestjs/typeorm";
import { ProfileLike } from "src/profile/domain/entity/profile-like";
import { CaregiverProfileRepository } from "src/profile/infra/repository/caregiver-profile.repository";

/* Mocking CaregiverProfileRepository */
export const MockCaregiverProfileRepository = {
    provide: CaregiverProfileRepository,
    useValue: {
        save: jest.fn(),
        findById: jest.fn(),
        findByUserId: jest.fn(),
        delete: jest.fn(),
        getProfileList: jest.fn()
    }
};

/* Mocking ProfileLikeHistoryRepository */
export const MockProfileLikeHistoryRepository = {
    provide: getRepositoryToken(ProfileLike),
    useValue: {
        save: jest.fn(),
        findByProfileAndUserId: jest.fn()
    }
}