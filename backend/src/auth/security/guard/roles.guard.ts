import { Inject, Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const { purpose } = context.switchToHttp().getRequest().user;

        if (roles.includes(purpose))
            throw new HttpException(
                '찜 등록은 보호자만 가능합니다',
                HttpStatus.FORBIDDEN
            );

        return true;
    }
}
