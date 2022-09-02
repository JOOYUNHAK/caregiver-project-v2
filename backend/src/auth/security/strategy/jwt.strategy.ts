import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "../../entity/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor (
        private configService: ConfigService,

        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {
        super({
            //토큰이 유효한지 파악하기 위해 설정할 당시 토큰 secretkey값 포함
            secretOrKey: configService.get('jwt.accessToken.secretKey'),
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload) {

        const { userid } = payload;
        
        const user = await this.userRepository.findOne({ 
            select: ['id', 'email', 'name', 'purpose', 'isCertified', 'warning', 'token_index'],
            where: {
                id: userid
            }
         });

        if(!user) {
            throw new HttpException(
                '사용자를 찾을 수 없습니다.',
                HttpStatus.NOT_FOUND
            )
        }
        return user;
    }
}