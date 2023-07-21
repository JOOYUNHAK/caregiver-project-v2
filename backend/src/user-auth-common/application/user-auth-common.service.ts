import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Phone } from "../domain/entity/user-phone.entity";
import { PhoneRepository } from "../domain/repository/user-phone.repository";
import { User } from "../domain/entity/user.entity";
import { UserRepository } from "../domain/repository/user.repository";

@Injectable()
export class UserAuthCommonService {
    constructor(
        @InjectRepository(Phone)
        private readonly phoneRepository: PhoneRepository,
        @InjectRepository(User)
        private readonly userRepository: UserRepository
    ) { };

    /* 이미 가입되어있는 사용자인지 확인 */
    async checkExistingUserByPhone(phoneNumber: string): Promise<boolean> {
        if (await this.phoneRepository.findByPhoneNumber(phoneNumber)) 
            return true;
        return false;
    }

    async findUserById(userId: number): Promise<User | null> {
        return await this.userRepository.findById(userId);
    }
}