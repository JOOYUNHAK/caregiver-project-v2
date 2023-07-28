import { CaregiverProfileService } from "src/profile/application/service/caregiver-profile.service";
import { PatientProfileService } from "src/profile/application/service/patient-profile.service";

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