import { UserMapper } from "src/user/application/mapper/user.mapper";

/* Mocking UserMapper */
export const MockUserMapper = {
    provide: UserMapper,
    useValue: {
        mapFrom: jest.fn(),
        toDto: jest.fn(),
        toMyProfileDto: jest.fn()
    }
};


