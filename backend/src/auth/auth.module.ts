import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { userRepository } from './user.repository';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { SendService } from './send.service';
import { assistantRepository, careGiverRepository, protectorRepository } from './register.repository';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [
    DatabaseModule,
    RedisModule
  ],
  controllers: [AuthController],
  providers: [
    ...userRepository,
    ...protectorRepository,
    ...careGiverRepository,
    ...assistantRepository,
    AuthService,
    UserService,
    SendService
  ],
})
export class AuthModule {}
