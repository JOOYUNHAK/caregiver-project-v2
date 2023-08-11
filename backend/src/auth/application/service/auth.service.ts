import { ConflictException, Injectable } from "@nestjs/common";
import { AuthenticationCodeMessage } from "src/auth/domain/authentication-code-message";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { SmsService } from "src/notification/sms/application/service/sms.service";
import { VerificationUsageService } from "./verification-usage.service";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { ClientDto } from "src/user-auth-common/interface/client.dto";
import { TokenService } from "./token.service";
import { AuthMapper } from "../mapper/auth.mapper";
import { SessionService } from "./session.service";
import { AuthenticationCodeService } from "./authentication-code.service";
import { UserAuthCommonService } from "src/user-auth-common/application/user-auth-common.service";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "src/user-auth-common/domain/repository/user.repository";
import { NewUserAuthentication } from "src/user-auth-common/domain/interface/new-user-authentication.interface";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
        private readonly userAuthCommonService: UserAuthCommonService,
        private readonly authenticationCodeService: AuthenticationCodeService, // 인증 코드 관리 서비스(email, phone)
        private readonly verificationUsageService: VerificationUsageService, // 인증 사용내역 서비스(email, phone)
        private readonly tokenService: TokenService, // 토큰 서비스(access, refresh)
        private readonly smsService: SmsService, // sms 발송 서비스
        private readonly sessionService: SessionService, // session 관리 서비스
        private readonly authMapper: AuthMapper
    ) { }

    async register(phoneNumber: string) {
        /* 이미 가입된 전화번호 인지 확인 이후 인증번호 발송 */
        if (await this.userAuthCommonService.checkExistingUserByPhone(phoneNumber))
            throw new ConflictException(ErrorMessage.DuplicatedPhoneNumber);
        await this.sendPhoneAuthCode(phoneNumber);
    };

    /* 신규회원이면 인증에 성공하면 바로 회원가입창으로 이동 */
    async login(phoneNumber: string): Promise<'newuser' | 'exist'> {
        await this.sendPhoneAuthCode(phoneNumber); // 발송 이후 코드 저장
        if (await this.userAuthCommonService.checkExistingUserByPhone(phoneNumber)) return 'exist'; // 가입 사용자인지 체크
        return 'newuser';
    }

    /* 로그아웃 -> 세션 리스트에서 사용자의 토큰 삭제 */
    async logout(user: User): Promise<void> {
        await this.sessionService.deleteUserFromList(user.getId());
    }

    /* 회원가입 시 새로운 인증을 발급 */
    async createAuthentication(user: User): Promise<ClientDto> {
        const newAuthentication = await this.generateAuthentication(user);
        user.setAuthentication(newAuthentication);
        await this.userRepository.save(user);
        return await this.addToSessionListAndMapToDto(user, newAuthentication.accessToken);
    }

    /* 만료된 토큰일 경우 RefreshToken으로 새로 갱신 */
    async refreshAuthentication(user: User): Promise<ClientDto> {
        const refreshedAuthentication = await this.generateAuthentication(user);
        user.refreshAuthentication(refreshedAuthentication);
        await this.userRepository.save(user);
        return await this.addToSessionListAndMapToDto(user, refreshedAuthentication.accessToken);
    }

    /* 문자 발송 이후 발송된 코드 저장 */
    private async sendPhoneAuthCode(phoneNumber: string) {
        const authenticationCodeMessage = new AuthenticationCodeMessage(phoneNumber); // 메시지 생성
        await this.smsService.send(authenticationCodeMessage); // 문자 발송
        await Promise.all([
            this.verificationUsageService.addPhoneUsageHistory(phoneNumber), // 일일 휴대폰인증 1회 추가
            this.authenticationCodeService.addPhoneCode( // 발송된 인증코드 저장
                phoneNumber, authenticationCodeMessage.getAuthenticationCode().toString()
            )
        ]);
    }

    /* 새로운 전체 인증(AccessToken, RefreshToken)을 생성하는 메서드 */
    private async generateAuthentication(user: User): Promise<NewUserAuthentication> {
        return await this.tokenService.generateNewUsersToken(user);
    }

    /* 세션 리스트에 사용자를 추가하고 사용자에게 넘겨줄 Dto로 변환 */
    private async addToSessionListAndMapToDto(user: User, newAccessToken: string): Promise<ClientDto> {
        await this.sessionService.addUserToList(user.getId(), newAccessToken);
        return this.authMapper.toDto(user);
    }
}