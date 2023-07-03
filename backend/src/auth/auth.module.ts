import { Module } from '@nestjs/common';
import { RedisModule } from 'src/common/shared/database/redis/redis.module';
import { AuthService } from './application/service/auth.service';
import { AuthController } from './interface/controller/auth.controller';
import { SmsService } from 'src/notification/sms/infra/service/sms.service';
import { NaverSmsService } from 'src/notification/sms/infra/service/naver-sms.service';
import { UserAuthCommonModule } from 'src/user-auth-common/user-auth-common.module';
import { TokenService } from './application/service/token.service';

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
export class AuthModule {}
