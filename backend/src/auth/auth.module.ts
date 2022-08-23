import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { userRepository } from './user.repository';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { SendService } from './send.service';
import { careGiverRepository, protectorRepository } from './register.repository';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    ...userRepository,
    ...protectorRepository,
    ...careGiverRepository,
    AuthService,
    UserService,
    SendService
  ],
})
export class AuthModule {}
