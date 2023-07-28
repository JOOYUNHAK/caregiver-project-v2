import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_GUARD, Reflector } from "@nestjs/core";
import { JwtModuleAsyncOptions } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { SessionService } from "../../service/session.service";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";
import { IS_PUBLIC_KEY } from "../../decorator/public.decorator";
import { User } from "src/user-auth-common/domain/entity/user.entity";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private readonly sessionService: SessionService,
        private readonly reflector: Reflector
    ) {
        super();
    };

    async canActivate(context: ExecutionContext): Promise<boolean> {
        /* Public Api인지 먼저 체크 */
        if( this.isPublicApi(context) ) return true;

        /* 먼저 request.user의 상태를 확인해서 토큰 검사 통과했는지 확인 */
        await super.canActivate(context) 
        
        const user = context.switchToHttp().getRequest().user;

        return await this.isExistUserInSessionList(user.getId())
    };

    handleRequest(err: any, user: User, info: any, context: ExecutionContext, status?: any): any {
        if( user ) return user;

        if( info.name === 'TokenExpiredError' )
            throw new UnauthorizedException(ErrorMessage.ExpiredToken);
        
        return super.handleRequest(err, user, info, context, status);
    }

    private isPublicApi(context: ExecutionContext) {
        return this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
    }

    /* 
        토큰은 유효하지만 로그아웃을 진행한 사용자와같이 
        현재 로그인정보에 없는 사용자의 토큰이면 오류 
    */
    private async isExistUserInSessionList(userId: number): Promise<boolean> {
        if (!await this.sessionService.getUserFromList(userId))
            throw new UnauthorizedException(ErrorMessage.NotExistUserInSessionList);
        return true;
    }

};

/* jwt module options */
export const jwtRegisterOptions: JwtModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.accessToken.secret'),
        signOptions: { expiresIn: configService.get('jwt.accessToken.expiredTime') }
    })
};

export const GlobalScopedJwtGuard = {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
}