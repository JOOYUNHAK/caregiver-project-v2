import { Module } from '@nestjs/common';
import { RedisModule } from 'src/common/shared/database/redis/redis.module';
import { AuthService } from './application/service/auth.service';
import { AuthController } from './interface/controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from 'src/user-auth-common/domain/entity/user-phone.entity';
import { PhoneRepositoryProvider } from 'src/user-auth-common/domain/repository/user-phone.repository';
import { SmsService } from 'src/notification/sms/infra/service/sms.service';
import { NaverSmsService } from 'src/notification/sms/infra/service/naver-sms.service';

@Module({
  imports: [
    RedisModule,
    TypeOrmModule.forFeature([Phone])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PhoneRepositoryProvider,
    SmsService,
    NaverSmsService
  ],
})
export class AuthModule {}
