import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { RedisClientType } from "redis";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { NewUserAuthentication } from "src/user-auth-common/domain/interface/new-user-authentication.interface";
import { JwtPayload } from "../type/jwt-payload.type";

@Injectable()
export class TokenService {
    private accessTokenSecret: string;
    private accessTokenExpiresIn: string;
    private refreshTokenSecret: string;
    private refreshTokenExpiresIn: string;

    constructor(
        @Inject('REDIS_CLIENT')
        private readonly redis: RedisClientType,
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
        return { accessToken, refreshToken };
    };

    async generateAccessToken(user: User): Promise<string> {
        return await this.jwtService.signAsync( this.generateJwtPayload(user), {
            secret: this.accessTokenSecret,
            expiresIn: this.accessTokenExpiresIn
        });
    };

    async generateRefreshToken(user: User): Promise<string> {
        return await this.jwtService.signAsync( this.generateJwtPayload(user), {
            secret: this.refreshTokenSecret,
            expiresIn: this.refreshTokenExpiresIn
        });
    };

    /* 클라이언트용 토큰 필요할때마다 검사하기 위해 리스트에 추가 */
    async addAccessTokenToSessionList(id: number, accessToken: string): Promise<void> {
        await this.redis.HSET('user:session:list', id, accessToken);
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