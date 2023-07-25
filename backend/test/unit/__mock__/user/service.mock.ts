import { UserMapper } from "src/user/application/mapper/user.mapper";
import { CaregiverProfileService } from "src/user/application/service/caregiver-profile.service";
import { PatientProfileService } from "src/user/application/service/patient-profile.service";

/* Mocking UserMapper */
export const MockUserMapper = {
    provide: UserMapper,
    useValue: {
        mapFrom: jest.fn(),
        toDto: jest.fn(),
        toMyProfileDto: jest.fn()
    }
};

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


