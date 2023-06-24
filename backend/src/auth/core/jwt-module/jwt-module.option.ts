import { ConfigModule, ConfigService } from "@nestjs/config";

export const jwtModuleOptions = {
    import: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.accessToken.secret'),
        signOptions: { expiresIn: configService.get('jwt.accessToken.expiredTime')}
    })
};