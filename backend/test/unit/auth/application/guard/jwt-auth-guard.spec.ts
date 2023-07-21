import { UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Reflector } from "@nestjs/core"
import { Test } from "@nestjs/testing"
import { JwtAuthGuard } from "src/auth/application/guard/jwt/jwt-auth.guard"
import { JwtStrategy } from "src/auth/application/guard/jwt/jwt.strategy"
import { SessionService } from "src/auth/application/service/session.service"
import { MockSessionService } from "test/unit/__mock__/auth/service.mock"
import { MockUserAuthCommonService } from "test/unit/__mock__/user-auth-common/service.mock"

describe('Jwt인증가드(JwtAuthGuard) Test', () => {
    let sessionService: SessionService;
    let reflector: Reflector;
    let jwtGuard: JwtAuthGuard;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                JwtAuthGuard,
                JwtStrategy,
                MockUserAuthCommonService,
                MockSessionService,
                {
                    provide: Reflector,
                    useValue: {
                        getAllAndOverride: jest.fn()
                    }
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('test')
                    }
                }
            ]
        }).compile();

        sessionService = module.get(SessionService);
        reflector = module.get(Reflector);
        jwtGuard = module.get(JwtAuthGuard);
    });

    it('Public Api이면 True 반환', async () => {
        jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce('sef');
        const mockContext: any = {
            getHandler: jest.fn(),
            getClass: jest.fn(),
        };
        const result = await jwtGuard.canActivate(mockContext);
        expect(result).toBe(true);
    });

    describe('Public Api가 아닌 경우', () => {

        beforeAll(() => jest.spyOn(reflector, 'getAllAndOverride').mockReturnValueOnce(false));

        it('헤더에 토큰 정보가 없다면 에러', async () => {
            const mockContext: any = {
                getHandler: jest.fn(),
                getClass: jest.fn(),
                switchToHttp: () => ({
                    getResponse: jest.fn(),
                    getRequest: () => ({
                        headers: {},
                    })
                })
            };

            const result = async () => await jwtGuard.canActivate(mockContext);
            await expect(result).rejects.toThrowError(UnauthorizedException)
        });

        it('토큰의 형식이 잘못되었다면 에러', async () => {
            const mockContext: any = {
                getHandler: jest.fn(),
                getClass: jest.fn(),
                switchToHttp: () => ({
                    getResponse: jest.fn(),
                    getRequest: () => ({
                        headers: {
                            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
                        },
                    })
                })
            };

            const result = async () => await jwtGuard.canActivate(mockContext);
            await expect(result).rejects.toThrowError(UnauthorizedException)
        });

        it('만료된 토큰이라면 에러', async() => {
            const mockContext: any = {
                getHandler: jest.fn(),
                getClass: jest.fn(),
                switchToHttp: () => ({
                    getResponse: jest.fn(),
                    getRequest: () => ({
                        headers: {
                            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwicm9sZSI6ImNhcmVnaXZlciIsImlhdCI6MTUxNjIzOTAyMn0.j-8NzDc8SkY7mRzgLpllfVdOAPsc2n1dDCkRbZ1EQgI"
                        },
                    })
                })
            };
            
            const result = async () => await jwtGuard.canActivate(mockContext);
            await expect(result).rejects.toThrowError(UnauthorizedException)

        })
    })
})