import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/auth/application/service/auth.service";
import { AuthenticationCodeService } from "src/auth/application/service/authentication-code.service";
import { SessionService } from "src/auth/application/service/session.service";
import { TokenService } from "src/auth/application/service/token.service";
import { VerificationUsageService } from "src/auth/application/service/verification-usage.service";

/* 인증코드관리 서비스(AuthenticationCodeService) */
export const MockAuthenticationCodeService = {
    provide: AuthenticationCodeService,
    useValue: {
        addPhoneCode: jest.fn(),
        getPhoneCode: jest.fn()
    }
};

/* 인증 서비스(AuthService) */
export const MockAuthService = {
    provide: AuthService,
    useValue: {
        register: jest.fn(),
        login: jest.fn(),
        refreshAuthentication: jest.fn(),
        createAuthentication: jest.fn(),
        validateSmsCode: jest.fn()
    }
};

/* 토큰 서비스(TokenService) */
export const MockTokenService = {
    provide: TokenService,
    useValue: {
        generateNewUsersToken: jest.fn(),
        generateAccessToken: jest.fn(),
        generateRefreshToken: jest.fn(),
        extractTokenFromHeader: jest.fn(),
        decode: jest.fn()
    }
};

/* 세션 서비스(SessionService) */
export const MockSessionService = {
    provide: SessionService,
    useValue: {
        addUserToList: jest.fn(),
        getUserFromList: jest.fn(),
        deleteUserFromList: jest.fn()
    }
};

/* 인증사용 내역 서비스(VerificationService) */
export const MockVerificationUsageService = {
    provide: VerificationUsageService,
    useValue: {
        addPhoneUsageHistory: jest.fn(),
        getPhoneUsageHistory: jest.fn(),
        addPhoneCodeAttemp: jest.fn()
    }
};

export const MockJwtService = {
    provide: JwtService,
    useValue: {
        signAsync: jest.fn(),
        verifyAsync: jest.fn(),
        decode: jest.fn()
    }
}


