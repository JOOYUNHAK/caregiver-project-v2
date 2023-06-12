import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfiguration from 'config/database.configuration';
import serviceConfiguration from 'config/service.configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOptions } from './common/shared/database/mysql/typeorm.option';
import { RedisModule } from './common/shared/database/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfiguration, serviceConfiguration]
    }),
    TypeOrmModule.forRootAsync(TypeOrmOptions),
    RedisModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

