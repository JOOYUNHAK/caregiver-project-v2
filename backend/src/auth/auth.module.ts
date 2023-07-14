import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RedisModule } from 'src/common/shared/database/redis/redis.module';
import { AuthService } from './application/service/auth.service';
import { AuthController } from './interface/controller/auth.controller';
import { UserAuthCommonModule } from 'src/user-auth-common/user-auth-common.module';
import { TokenService } from './application/service/token.service';
import { phoneValidate } from 'src/common/middleware/phone-validator.middleware';
import { PhoneAuthenticationSendGuard } from './application/guard/authentication-send.guard';
import { PhoneVerificationRepository } from './infra/repository/phone-verification.repository';
import { VerificationUsageService } from './application/service/verification-usage.service';
import { PhoneAuthenticationCodeGuard } from './application/guard/authentication-code.guard';
import { AuthMapper } from './application/mapper/auth.mapper';
import { SessionService } from './application/service/session.service';
import { AuthenticationCodeService } from './application/service/authentication-code.service';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    RedisModule,
    UserAuthCommonModule,
    NotificationModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    PhoneAuthenticationSendGuard,
    PhoneVerificationRepository,
    VerificationUsageService,
    PhoneAuthenticationCodeGuard,
    AuthMapper,
    AuthenticationCodeService,
    SessionService
  ],
  exports: [
    TokenService,
    SessionService,
    PhoneVerificationRepository
  ]
})
export class AuthModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(phoneValidate)
      .forRoutes(
        { path: 'auth/register', 'method': RequestMethod.POST },
        { path: 'auth/login', 'method': RequestMethod.POST }
      )
  }
}
