import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/**
 * 개인의 정보에 대해서 유효한 토큰이라도 payload의 아이디와 조회를 원하는
 * id가 다를 경우 error throw
 */
@Injectable()
export class PersonalGuard implements CanActivate {
    constructor(
        private jwtService: JwtService
    ){}
    canActivate(context: ExecutionContext): boolean {
        const request  = context.switchToHttp().getRequest();
        const authorization:string = request.headers['authorization'];
        const id:string = request.user.id;
        const accessToken: string = authorization.split(' ')[1];

        const userid = this.jwtService.decode(accessToken)['userid'];

        if( userid === id )
            return true;
        
        throw new HttpException (
            '다른 사용자의 정보에 접근하지 마세요',
            HttpStatus.FORBIDDEN
        )
        /* if(body?.data?.['user'])
            console.log('good')
        else 
            console.log('bad') */
    }
}