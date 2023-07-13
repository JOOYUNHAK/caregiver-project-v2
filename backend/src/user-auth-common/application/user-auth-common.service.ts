import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Phone } from "../domain/entity/user-phone.entity";
import { PhoneRepository } from "../domain/repository/user-phone.repository";

@Injectable()
export class UserAuthCommonService {
    constructor(
        @InjectRepository(Phone)
        private readonly phoneRepository: PhoneRepository
    ) { };

    /* 이미 가입되어있는 사용자인지 확인 */
    async checkExistingUserByPhone(phoneNumber: string): Promise<boolean> {
        if (await this.phoneRepository.findByPhoneNumber(phoneNumber)) 
            return true;
        return false;
    }
}