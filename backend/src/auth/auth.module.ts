import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RedisModule } from 'src/common/shared/database/redis/redis.module';
import { AuthService } from './application/service/auth.service';
import { AuthController } from './interface/controller/auth.controller';
import { SmsService } from 'src/notification/sms/infra/service/sms.service';
import { NaverSmsService } from 'src/notification/sms/infra/service/naver-sms.service';
import { UserAuthCommonModule } from 'src/user-auth-common/user-auth-common.module';
import { TokenService } from './application/service/token.service';
import { phoneValidate } from 'src/common/middleware/phone-validator.middleware';

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
    TokenService
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
        { path: 'register', 'method': RequestMethod.POST },
        { path: 'login', 'method': RequestMethod.POST }
      )
  }
}
