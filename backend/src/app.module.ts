import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configurationYaml from '../config/configuration.yaml';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurationYaml]
    }),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

