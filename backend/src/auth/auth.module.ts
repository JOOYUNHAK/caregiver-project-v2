import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { userRepository } from './user.repository';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { SendService } from './send.service';
import { assistantRepository, careGiverRepository, protectorRepository } from './register.repository';
import { RedisModule } from 'src/redis/redis.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './security/strategy/jwt.strategy';
import { tokenRepository } from './token.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    RedisModule,
    PassportModule,
    JwtModule,
    forwardRef(() => UserModule)
  ],
  controllers: [AuthController],
  providers: [
    ...userRepository,
    ...protectorRepository,
    ...careGiverRepository,
    ...assistantRepository,
    ...tokenRepository,
    AuthService,
    UserService,
    SendService,
    JwtStrategy
  ],
  exports: [
    JwtStrategy, 
    PassportModule, 
    JwtModule, 
    UserService,
    ...userRepository,
    ...careGiverRepository,
    ...tokenRepository
  ]
})
export class AuthModule {}
