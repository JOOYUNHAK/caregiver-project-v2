import { CARE_APPLIED_SERVICE } from "src/common/shared/constants";

/* Mocking CareAppliedService */
export const MockCareAppliedService = {
    provide: CARE_APPLIED_SERVICE,
    useValue: {
        applied: jest.fn()
    }
}