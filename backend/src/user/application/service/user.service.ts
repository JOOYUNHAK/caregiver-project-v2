import { Injectable } from "@nestjs/common";
import { ClientDto } from "src/user-auth-common/interface/client.dto";
import { CaregiverRegisterDto } from "src/profile/interface/dto/caregiver-register.dto";
import { UserMapper } from "../mapper/user.mapper";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { Repository } from "typeorm";
import { ROLE } from "src/user-auth-common/domain/enum/user.enum";
import { CaregiverProfileService } from "../../../profile/application/service/caregiver-profile.service";
import { ProtectorRegisterDto } from "src/profile/interface/dto/protector-register.dto";
import { PatientProfileService } from "../../../profile/application/service/patient-profile.service";
import { MyProfileDto } from "src/user/interface/dto/my-profile.dto";
import { AuthService } from "src/auth/application/service/auth.service";

@Injectable()
export class UserService {
    constructor(
        private readonly userMapper: UserMapper,
        private readonly authService: AuthService,
        private readonly caregiverProfileService: CaregiverProfileService,
        private readonly patientProfileService: PatientProfileService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {};

    async register(registerDto: CaregiverRegisterDto | ProtectorRegisterDto): Promise<ClientDto> {
        const user = this.userMapper.mapFrom(registerDto.firstRegister); // 공통회원가입 양식으로부터 사용자 생성

        const savedUser = await this.userRepository.save(user); // DB에 저장하고 ID를 발급받음

        await this.addProfile(savedUser.getId(), registerDto); // 각자의 역할 프로필 저장

        return await this.authService.createAuthentication(savedUser); // 새로운 토큰들을 발급받아 저장
    }

    async getMyProfile(user: User): Promise<MyProfileDto> {
        /* 간병인이면 프로필 조회해서  */
        if( user.getRole() === ROLE.CAREGIVER ) {
            const caregiverProfile = await this.caregiverProfileService.getProfileByUserId(user.getId());
            return await this.userMapper.toMyProfileDto(user, caregiverProfile);
        }
        return await this.userMapper.toMyProfileDto(user);
    }

    /* 가입 목적별 프로필 추가 */
    private async addProfile(userId: number, registerDto: CaregiverRegisterDto | ProtectorRegisterDto) {
        registerDto.firstRegister.purpose == ROLE.CAREGIVER ?
            await this.caregiverProfileService.addProfile(userId, registerDto as CaregiverRegisterDto) : 
                await this.patientProfileService.addProfile(userId, registerDto as ProtectorRegisterDto);
    };

}