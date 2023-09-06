import { ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { RoleGuard } from "src/core/guard/role.guard";
import { ROLE } from "src/user-auth-common/domain/enum/user.enum";
import { UserFixtures } from "test/unit/user/user.fixtures";

describe('설정한 역할 이외는 접근 제한하는 가드(RoleGuard) Test', () => {
    
    it('특정 역할만 접근 가능한 API를 다른 역할의 사용자가 접근할 경우 제한하는지 확인', () => {
        const mockContext = {
            switchToHttp: () => ({
                getRequest: () => ({
                    user: UserFixtures.createWithRole(ROLE.CAREGIVER) // 접근한 사용자는 간병인
                })
            }),
            getHandler: jest.fn()
        } as unknown as ExecutionContext;

        /* 보호자만 가능한 API라고 메타데이터 설정 */
        const mockReflector = { get: jest.fn().mockReturnValueOnce(ROLE.PROTECTOR) } as unknown as Reflector;

        const roleGuard = new RoleGuard(mockReflector);

        const result = () => roleGuard.canActivate(mockContext);

        expect(result).toThrowError(new ForbiddenException(ErrorMessage.PermissionDeniedForRole));
    });

    it('접근 가능한 API를 해당 역할의 사용자가 접근했을 경우 true 반환 확인', () => {
        const mockContext = {
            switchToHttp: () => ({
                getRequest: () => ({
                    user: UserFixtures.createWithRole(ROLE.PROTECTOR) // 접근한 사용자는 보호자
                })
            }),
            getHandler: jest.fn()
        } as unknown as ExecutionContext;
        
        /* 보호자만 가능한 API라고 메타데이터 설정 */
        const mockReflector = { get: jest.fn().mockReturnValueOnce(ROLE.PROTECTOR) } as unknown as Reflector;

        const roleGuard = new RoleGuard(mockReflector);

        const result = roleGuard.canActivate(mockContext);

        expect(result).toBe(true);
    })
})