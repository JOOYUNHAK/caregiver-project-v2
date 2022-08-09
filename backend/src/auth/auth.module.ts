import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { userRepository } from './user.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    ...userRepository,
    AuthService
  ]
})
export class AuthModule {}
