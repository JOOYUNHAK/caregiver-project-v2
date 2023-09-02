import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";

/* 지정한 역할이 아닌 경우 Api 접근 금지 */
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) {};

    /* 인증을 거치고 난 후 들어오는 요청의 사용자 역할 검사 */
    canActivate(context: ExecutionContext): boolean | never {
        const { user } = context.switchToHttp().getRequest();
        /* 사용자의 역할이 보호자가 아니라면 에러 */
        if( user.getRole() !== this.reflector.get('roles', context.getHandler()))
            throw new ForbiddenException(ErrorMessage.PermissionDeniedForRole);
        return true;
    }
}