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
import { MongodbModule } from './common/shared/database/mongodb/mongodb.module';
import { NotificationModule } from './notification/notification.module';
import { BatchModule } from './batch/batch.module';
import { GlobalScopedJwtGuard } from './auth/application/guard/jwt/jwt-auth.guard';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfiguration, serviceConfiguration]
    }),
    CoreModule,
    TypeOrmModule.forRootAsync(TypeOrmOptions),
    RedisModule,
    MongodbModule,
    BatchModule,
    AuthModule,
    NotificationModule,
    UserAuthCommonModule,
    UserModule,
    ProfileModule
  ],
  providers: [
    GlobalScopedValidationPipe,
    GlobalScopedExceptionFilter,
    GlobalScopedJwtGuard
  ]
})
export class AppModule {}

