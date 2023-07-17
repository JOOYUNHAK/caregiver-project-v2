import { getRepositoryToken } from "@nestjs/typeorm";
import { Phone } from "src/user-auth-common/domain/entity/user-phone.entity";
import { User } from "src/user-auth-common/domain/entity/user.entity";

/* 사용자 저장소(UserRepository) */
export const MockUserRepository = {
    provide: getRepositoryToken(User),
    useValue: {
        save: jest.fn(),
        findByPhoneNumber: jest.fn()
    }
};

/* 휴대폰 저장소(PhoneRepository) */
export const MockPhoneRepository = {
    provide: getRepositoryToken(Phone),
    useValue: {
        findByPhoneNumber: jest.fn()
    }
};