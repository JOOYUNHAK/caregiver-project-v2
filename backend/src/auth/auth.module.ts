import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { userRepository } from './user.repository';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { SendService } from './send.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    ...userRepository,
    AuthService,
    UserService,
    SendService
  ],
})
export class AuthModule {}
