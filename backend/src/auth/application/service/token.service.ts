import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { NewUserAuthentication } from "src/user-auth-common/domain/interface/new-user-authentication.interface";
import { JwtPayload } from "../type/jwt-payload.type";
import { RefreshToken } from "src/user-auth-common/domain/refresh-token";
import { UUIDUtil } from "src/util/uuid.util";

@Injectable()
export class TokenService {
    private accessTokenSecret: string;
    private accessTokenExpiresIn: string;
    private refreshTokenSecret: string;
    private refreshTokenExpiresIn: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {
        this.accessTokenSecret = this.configService.get('jwt.accessToken.secret');
        this.accessTokenExpiresIn = this.configService.get('jwt.accessToken.expiresIn');
        this.refreshTokenSecret = this.configService.get('jwt.refreshToken.secret');
        this.refreshTokenExpiresIn = this.configService.get('jwt.refreshToken.expiresIn');
    };

    /* 새로운 사용자의 인증(토큰) 발급 */
    async generateNewUsersToken(user: User): Promise<NewUserAuthentication> {
        const [accessToken, refreshToken] = await Promise.all([this.generateAccessToken(user), this.generateRefreshToken(user)])
        return new NewUserAuthentication(accessToken, refreshToken);
    };

    async generateAccessToken(user: User): Promise<string> {
        return await this.jwtService.signAsync( this.generateJwtPayload(user), {
            secret: this.accessTokenSecret,
            expiresIn: this.accessTokenExpiresIn
        });
    };

    async generateRefreshToken(user: User): Promise<RefreshToken> {
        const [uuid, refreshToken] = [
            UUIDUtil.generatedUuidV1(),
            await this.jwtService.signAsync( this.generateJwtPayload(user), {
                secret: this.refreshTokenSecret,
                expiresIn: this.refreshTokenExpiresIn
            })
        ];
        return new RefreshToken(uuid, refreshToken);   
    };

    /* JwtToken의 Payload 생성 */
    private generateJwtPayload(user: User): JwtPayload {
        return {
            userId: user.getId(),
            role: user.getRole(),
            createdAt: new Date()
        };
    }

}