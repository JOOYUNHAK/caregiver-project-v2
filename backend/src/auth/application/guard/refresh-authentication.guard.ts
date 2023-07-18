import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { UserRepository } from "src/user-auth-common/domain/repository/user.repository";
import { JwtService } from "@nestjs/jwt";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";

@Injectable()
export class RefreshAuthenticationGuard implements CanActivate{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        /* 해당 RefreshKey를 가지고있는 User 조회 */
        const user = await this.getUserByRefreshKey(request.body.refreshKey); 

        /* 조회된 유저의 RefreshToken 검증 */
        await this.jwtService.verifyAsync( user.getAuthentication().getRefreshToken());

        request.user = user;
        return true;
    };

    private async getUserByRefreshKey(refreshKey: string): Promise<never | User>  {
        this.validateRefreshKey(refreshKey);
    
        const user = await this.userRepository.findByRefreshKey(refreshKey);
        
        if( !user )
            throw new UnauthorizedException(ErrorMessage.InvalidRefreshKey);

        return user;
    };

    /* 요청에 RefreshKey가 존재하는지 */
    private validateRefreshKey(refreshKey: string): never | void {
        if( !refreshKey )
            throw new UnauthorizedException(ErrorMessage.NotExistRefreshKeyInRequest);
    }
}