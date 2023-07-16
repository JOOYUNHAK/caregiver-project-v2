import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../../type/jwt-payload.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor( 
        private readonly configService: ConfigService
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('jwt.accessToken.secret')
        });
    }

    async validate(payload: JwtPayload | null) { return payload; };
}