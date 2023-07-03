import { Injectable } from "@nestjs/common";
import { CaregiverRegisterDto } from "src/user/interface/dto/caregiver-register.dto";
import { CaregiverProfileMapper } from "../mapper/caregiver-profile.mapper";
import { CaregiverProfileRepository } from "src/user/infra/repository/caregiver-profile.repository";

@Injectable()
export class CaregiverProfileService {
    constructor(
        private readonly caregiverProfileMapper: CaregiverProfileMapper,
        private readonly caregiverProfileRepository: CaregiverProfileRepository
    ) {}
    /* 회원가입시 새로운 프로필 추가 */
    async addProfile(userId: number, caregiverRegisterDto: CaregiverRegisterDto): Promise<void> {
        const caregiverProfile = this.caregiverProfileMapper.mapFrom(userId, caregiverRegisterDto);
        await this.caregiverProfileRepository.save(caregiverProfile);
    }  
}