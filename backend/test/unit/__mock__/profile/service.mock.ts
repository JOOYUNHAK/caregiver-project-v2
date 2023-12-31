import { CaregiverProfileMapper } from "src/profile/application/mapper/caregiver-profile.mapper";
import { CaregiverProfileService } from "src/profile/application/service/caregiver-profile.service";
import { PatientProfileService } from "src/profile/application/service/patient-profile.service";
import { ProfileLikeHistoryService } from "src/profile/application/service/profile-like-history.service";

/* Mocking CaregiverProfileService */
export const MockCaregiverProfileService = {
    provide: CaregiverProfileService,
    useValue: {
        addProfile: jest.fn(),
        getProfileByUserId: jest.fn()
    }
};

/* Mocking PatientProfileService */
export const MockPatientProfileService = {
    provide: PatientProfileService,
    useValue: {
        addProfile: jest.fn(),
    }
};

/* Mocking CaregiverProfileMapper */
export const MockCaregiverProfileMapper = {
    provide: CaregiverProfileMapper,
    useValue: {
        mapFrom: jest.fn(),
        toListQueryOptions: jest.fn(),
        toListDto: jest.fn(),
        toDetailDto: jest.fn()
    }
}

/* Mocking ProfileLikeHistoryService */
export const MockProfileLikeHistoryService = {
    provide: ProfileLikeHistoryService,
    useValue: {
        getProfileLikeMetadata: jest.fn()
    }
}