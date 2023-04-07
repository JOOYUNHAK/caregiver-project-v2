import { AuthGuard } from "@nestjs/passport";
import { Injectable, HttpException, HttpStatus, ExecutionContext } from "@nestjs/common";


@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info: Error): any {
        if( user )
            return user;
        //토큰 시간 만료된 경우
        if (info.name === 'TokenExpiredError') {
            throw new HttpException(
                '만료된 토큰 입니다.',
                HttpStatus.UNAUTHORIZED
            );
        }
        // 토큰의 형식이 잘못된 경우
        else if (info.name === 'JsonWebTokenError')
            throw new HttpException(
                '유효하지 않은 토큰입니다.',
                HttpStatus.NOT_FOUND
            )
        //헤더에 토큰이 없는 경우
        else
            throw new HttpException(
                '토큰 정보가 없습니다.',
                HttpStatus.BAD_REQUEST
            )
    }
}