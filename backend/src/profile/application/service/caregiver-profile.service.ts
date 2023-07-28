import { Injectable } from "@nestjs/common";
import { CaregiverRegisterDto } from "src/profile/interface/dto/caregiver-register.dto";
import { CaregiverProfileMapper } from "../mapper/caregiver-profile.mapper";
import { CaregiverProfileRepository } from "src/profile/infra/repository/caregiver-profile.repository";
import { CaregiverProfile } from "src/profile/domain/entity/caregiver/caregiver-profile.entity";

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

    /* 사용자 아이디로 프로필 조회 */
    async getProfileByUserId(userId: number): Promise<CaregiverProfile> {
        return await this.caregiverProfileRepository.findByUserId(userId)
    }
}