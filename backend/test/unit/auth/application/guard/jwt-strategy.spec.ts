import { ConfigService } from "@nestjs/config"
import { Test } from "@nestjs/testing"
import { JwtStrategy } from "src/auth/application/guard/jwt/jwt.strategy"
import { JwtPayload } from "src/auth/application/type/jwt-payload.type"
import { ErrorMessage } from "src/common/shared/enum/error-message.enum"
import { UserAuthCommonService } from "src/user-auth-common/application/user-auth-common.service"
import { User } from "src/user-auth-common/domain/entity/user.entity"
import { MockUserAuthCommonService } from "test/unit/__mock__/user-auth-common/service.mock"

describe('Jwt 전략(JwtStrategy) Test', () => {
    let jwtStrategy: JwtStrategy;
    let userAuthCommonService: UserAuthCommonService;
    beforeAll(async() => {
        const module = await Test.createTestingModule({
            providers: [
                JwtStrategy,
                MockUserAuthCommonService,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('test')
                    }
                }
            ]
        }).compile();
        jwtStrategy = module.get(JwtStrategy);
        userAuthCommonService = module.get(UserAuthCommonService);
    })

    it('토큰에 들어있는 사용자 정보를 찾을 수 없는경우 에러', async() => {
        jest.spyOn(userAuthCommonService, 'findUserByUserId').mockResolvedValueOnce(null);

        const result = async () => await jwtStrategy.validate({ userId: 1 } as JwtPayload);
        await expect(result).rejects.toThrowError(ErrorMessage.NotExistUser);
    })

    it('토큰에 들어있는 사용자 정보를 찾을 수 있는 경우 확인', async() => {
        jest.spyOn(userAuthCommonService, 'findUserByUserId').mockResolvedValueOnce({ id: 1 } as User);
        
        const result = await jwtStrategy.validate({ userId: 1 } as JwtPayload);
        expect(result).toEqual({id: 1})
    })

})