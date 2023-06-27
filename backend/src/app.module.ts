import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfiguration from 'config/database.configuration';
import serviceConfiguration from 'config/service.configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOptions } from './common/shared/database/mysql/typeorm.option';
import { RedisModule } from './common/shared/database/redis/redis.module';
import { UserModule } from './user/user.module';
import { UserAuthCommonModule } from './user-auth-common/user-auth-common.module';
import { GlobalScopedExceptionFilter } from './common/exception/all-exception.filter';
import { GlobalScopedValidationPipe } from './common/pipe/global-scoped.pipe';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfiguration, serviceConfiguration]
    }),
    CoreModule,
    TypeOrmModule.forRootAsync(TypeOrmOptions),
    RedisModule,
    AuthModule,
    UserAuthCommonModule,
    UserModule
  ],
  providers: [
    GlobalScopedValidationPipe,
    GlobalScopedExceptionFilter
  ]
})
export class AppModule {}

