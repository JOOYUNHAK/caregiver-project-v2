import { Injectable } from "@nestjs/common";
import { CaregiverRegisterDto } from "src/profile/interface/dto/caregiver-register.dto";
import { CaregiverProfileMapper } from "../mapper/caregiver-profile.mapper";
import { CaregiverProfileRepository } from "src/profile/infra/repository/caregiver-profile.repository";
import { CaregiverProfile } from "src/profile/domain/entity/caregiver/caregiver-profile.entity";
import { concatMap, firstValueFrom, from, mergeMap, toArray } from "rxjs";
import { UserAuthCommonService } from "src/user-auth-common/application/user-auth-common.service";
import { plainToInstance } from "class-transformer";
import { ProfileListDto } from "src/profile/interface/dto/profile-list.dto";

@Injectable()
export class CaregiverProfileService {
    constructor(
        private readonly caregiverProfileMapper: CaregiverProfileMapper,
        private readonly caregiverProfileRepository: CaregiverProfileRepository,
        private readonly userCommonService: UserAuthCommonService
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

    /* 프로필 리스트 조회 */
    async getProfileList(lastProfileId?: string): Promise<ProfileListDto []> {
        const profileCursor = this.caregiverProfileRepository.getProfileList(lastProfileId);

        return await firstValueFrom(
            from(profileCursor)
            .pipe(
                concatMap(async (profile: CaregiverProfile) => 
                    await this.fetchUserAndMerge(plainToInstance(CaregiverProfile, profile))),
                toArray()
            )
        )
    }
 
    /* 사용자 id를 받아오면서 profile 형식에 맞춰서 변경 */
    private async fetchUserAndMerge(profile: CaregiverProfile): Promise<ProfileListDto> { 
        const user = await this.userCommonService.findUserById(profile.getUserId());
        return this.caregiverProfileMapper.toListDto(user, profile);
    }
}