import { UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TokenExpiredExceptionFilter } from "src/auth/application/filter/token-expired-exception.filter";
import { SessionService } from "src/auth/application/service/session.service"
import { TokenService } from "src/auth/application/service/token.service";
import { JwtPayload } from "src/auth/application/type/jwt-payload.type";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { MockSessionService, MockTokenService } from "test/unit/__mock__/auth/service.mock";

describe('TokenExpiredExceptionFilter Test', () => {
    let sessionService: SessionService;
    let tokenService: TokenService;
    let tokenExpiredFilter:TokenExpiredExceptionFilter;
    
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                MockSessionService,
                MockTokenService
            ]
        }).compile();

        sessionService = module.get(SessionService);
        tokenService = module.get(TokenService);
        tokenExpiredFilter = new TokenExpiredExceptionFilter(sessionService, tokenService);
    });

    it('만료된 토큰으로 인한 문제가 아닌 UnauthorizedException이 발생하면 세션리스트에서 삭제 함수 호출 X', async () => {
        
        const mockRequest: any = {
            switchToHttp: () => ({
                getRequest: jest.fn(),
                getResponse: () => ({
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                })
            })
        };
        const wrongError = new UnauthorizedException('otherMessage');
        
        jest.spyOn(sessionService, 'deleteUserFromList');

        await tokenExpiredFilter.catch(wrongError, mockRequest);

        expect(sessionService.deleteUserFromList).not.toHaveBeenCalled()
    });

    it('만료된 토큰으로 인한 UnauthorizedException이 발생하면 세션리스트에서 삭제 함수 호출', async () => {
        const mockRequest: any = {
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {
                        authorization: "bearer accessToken"
                    }
                }),
                getResponse: () => ({
                    status: () => ({
                        send: jest.fn()
                    }),
                })
            })
        };
        
        const tokenExpiredError = new UnauthorizedException(ErrorMessage.ExpiredToken);
        
        const userId = 2;

        jest.spyOn(tokenService, 'decode').mockReturnValueOnce({ userId } as JwtPayload );

        await tokenExpiredFilter.catch(tokenExpiredError, mockRequest);

        expect(sessionService.deleteUserFromList).toHaveBeenCalledWith(userId);
    })    
})