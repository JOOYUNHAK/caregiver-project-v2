import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    RedisModule,
    //PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule,
    JwtModule
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
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
