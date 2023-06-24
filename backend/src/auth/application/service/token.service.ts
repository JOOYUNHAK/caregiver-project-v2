import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { NewUserAuthentication } from "src/user-auth-common/domain/interface/new-user-authentication.interface";

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
        return { accessToken, refreshToken };
    };

    async generateAccessToken(user: User): Promise<string> {
        return await this.jwtService.signAsync({ phoneNumber: (await user.getPhone()).getPhoneNumber(), createdAt: Date.now() }, {
            secret: this.accessTokenSecret,
            expiresIn: this.accessTokenExpiresIn
        });
    };

    async generateRefreshToken(user: User): Promise<string> {
        return await this.jwtService.signAsync({ phoneNumber: (await user.getPhone()).getPhoneNumber(), createdAt: Date.now() }, {
            secret: this.refreshTokenSecret,
            expiresIn: this.refreshTokenExpiresIn
        });
    };
}