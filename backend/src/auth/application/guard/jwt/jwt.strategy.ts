import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../../type/jwt-payload.type";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { UserAuthCommonService } from "src/user-auth-common/application/user-auth-common.service";
import { ErrorMessage } from "src/common/shared/enum/error-message.enum";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userAuthCommonService: UserAuthCommonService,
        private readonly configService: ConfigService
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('jwt.accessToken.secret')
        });
    }

    async validate(payload: JwtPayload): Promise<User | never> { 
        const user = await this.userAuthCommonService.findUserByUserId(payload.userId);
        if( !user )
            throw new UnauthorizedException(ErrorMessage.NotExistUser);
        return user;
    };
}