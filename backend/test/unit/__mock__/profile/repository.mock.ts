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