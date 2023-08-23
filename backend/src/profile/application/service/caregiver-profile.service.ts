import { Injectable } from "@nestjs/common";
import { CaregiverRegisterDto } from "src/profile/interface/dto/caregiver-register.dto";
import { CaregiverProfileMapper } from "../mapper/caregiver-profile.mapper";
import { CaregiverProfileRepository } from "src/profile/infra/repository/caregiver-profile.repository";
import { CaregiverProfile } from "src/profile/domain/entity/caregiver/caregiver-profile.entity";
import { ProfileListDto } from "src/profile/interface/dto/profile-list.dto";
import { ProfileDetailDto } from "src/profile/interface/dto/profile-detail.dto";
import { ROLE } from "src/user-auth-common/domain/enum/user.enum";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { ProfileViewRankService } from "src/rank/application/service/profile-view-rank.service";
import { GetProfileListDto } from "src/profile/interface/dto/get-profile-list.dto";
import { ProfileListCursor } from "src/profile/domain/profile-list.cursor";

@Injectable()
export class CaregiverProfileService {
    constructor(
        private readonly caregiverProfileMapper: CaregiverProfileMapper,
        private readonly caregiverProfileRepository: CaregiverProfileRepository,
        private readonly profileViewRankService: ProfileViewRankService
    ) {}
    
    /* 회원가입시 새로운 프로필 추가 */
    async addProfile(user: User, caregiverRegisterDto: CaregiverRegisterDto): Promise<void> {
        const caregiverProfile = this.caregiverProfileMapper.mapFrom(user, caregiverRegisterDto);
        await this.caregiverProfileRepository.save(caregiverProfile);
    } 

    /* 프로필 상세보기 */
    async getProfile(profileId: string, viewUser: User): Promise<ProfileDetailDto> {
        const profile = await this.caregiverProfileRepository.findById(profileId);
        profile.checkPrivacy();

        if( viewUser.getRole() === ROLE.PROTECTOR )
            await this.profileViewRankService.increment(profileId, viewUser);

        return this.caregiverProfileMapper.toDetailDto(profile);
    }

    /* 사용자 아이디로 프로필 조회 */
    async getProfileByUserId(userId: number): Promise<CaregiverProfile> {
        return await this.caregiverProfileRepository.findByUserId(userId)
    }

    /* 프로필 리스트 조회 */
    async getProfileList(getProfileListDto: GetProfileListDto): Promise<ProfileListDto> {
        const listQueryOptions = this.caregiverProfileMapper.toListQueryOptions(getProfileListDto) // listQueryOption 객체로 변환
        const caregiverProfileListData = await this.caregiverProfileRepository.getProfileList(listQueryOptions); // DB에서 프로필 리스트 조회
        const mapToClientFormatList  = caregiverProfileListData.map( profileData => this.caregiverProfileMapper.toListDto(profileData) ) // 프로필들을 프론트엔드 포맷으로 변경
        const nextCursor = ProfileListCursor.createNextCursor(mapToClientFormatList, listQueryOptions); // 다음 요청시 필요한 커서 생성
        return { caregiverProfileListData, nextCursor: nextCursor.toClientNext() };
    }
}