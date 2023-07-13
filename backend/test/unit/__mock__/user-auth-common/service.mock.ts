import { UserAuthCommonService } from "src/user-auth-common/application/user-auth-common.service";

export const MockUserAuthCommonService = {
    provide: UserAuthCommonService,
    useValue: {
        checkExistingUserByPhone: jest.fn()
    }
}