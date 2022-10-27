import { Injectable, NestMiddleware } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/auth/user.service';

@Injectable()
export class ProfileMiddleWare implements NestMiddleware {
    constructor (
        private jwtService: JwtService,
        private userService: UserService
    ){}
    async use(req: any, res: any, next: (error?: any) => void) {
        //보호자의 경우만 프로필 조호시
        //해당 프로필의 조회수 1 증가
        //순위에 노출된 프로필 조회시 증가 안시킴
        if(
            req.headers['authorization'] !== undefined &&
            !! req.query.profileId 
        ) {
            const _authorization = req.headers['authorization'];
            const _accessToken: string = _authorization.split(' ')[1];
            const _userid = this.jwtService.decode(_accessToken)['userid'];
            const { id, purpose } = await this.userService.findId(_userid);
            const { profileId } = req.query;
            if ( purpose === '간병인' )
                this.userService.countViewProfile( id, profileId );
        }
        next();
    }
} 