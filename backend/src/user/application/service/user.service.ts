import { Injectable } from "@nestjs/common";
import { ClientDto } from "src/user-auth-common/interface/client.dto";
import { CaregiverRegisterDto } from "src/user/interface/dto/caregiver-register.dto";
import { UserMapper } from "../mapper/user.mapper";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { Repository } from "typeorm";
import { TokenService } from "src/auth/application/service/token.service";
import { ROLE } from "src/user-auth-common/domain/enum/user.enum";
import { CaregiverProfileService } from "./caregiver-profile.service";
import { ProtectorRegisterDto } from "src/user/interface/dto/protector-register.dto";
import { PatientProfileService } from "./patient-profile.service";
import { SessionService } from "src/auth/application/service/session.service";
import { MyProfileDto } from "src/user/interface/dto/my-profile.dto";

@Injectable()
export class UserService {
    constructor(
        private readonly userMapper: UserMapper,
        private readonly tokenService: TokenService,
        private readonly sessionService: SessionService,
        private readonly caregiverProfileService: CaregiverProfileService,
        private readonly patientProfileService: PatientProfileService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {};

    async register(registerDto: CaregiverRegisterDto | ProtectorRegisterDto): Promise<ClientDto> {
        const user = this.userMapper.mapFrom(registerDto.firstRegister); // 공통회원가입 양식으로부터 사용자 생성

        const authentication = await this.tokenService.generateNewUsersToken(user); // 새로운 인증 생성
        user.setAuthentication(authentication); 

        const savedUser = await this.userRepository.save(user); // DB에 저장된 User
        await Promise.all([
            this.sessionService.addUserToList(savedUser.getId(), authentication.accessToken), // 세션리스트에 사용자 토큰 추가
            this.addProfile(savedUser.getId(), registerDto) // 가입목적별 프로필 추가
        ]); 

        return this.userMapper.toDto(savedUser)
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