import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RedisModule } from 'src/common/shared/database/redis/redis.module';
import { AuthService } from './application/service/auth.service';
import { AuthController } from './interface/controller/auth.controller';
import { SmsService } from 'src/notification/sms/infra/service/sms.service';
import { NaverSmsService } from 'src/notification/sms/infra/service/naver-sms.service';
import { UserAuthCommonModule } from 'src/user-auth-common/user-auth-common.module';
import { TokenService } from './application/service/token.service';
import { phoneValidate } from 'src/common/middleware/phone-validator.middleware';
import { PhoneAuthenticationSendGuard } from './application/guard/authentication-send.guard';
import { PhoneVerificationRepository } from './infra/repository/phone-verification.repository';
import { VerificationUsageService } from './application/service/verification-usage.service';

@Module({
  imports: [
    RedisModule,
    UserAuthCommonModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SmsService,
    NaverSmsService,
    TokenService,
    PhoneAuthenticationSendGuard,
    PhoneVerificationRepository,
    VerificationUsageService
  ],
  exports: [
    TokenService
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
