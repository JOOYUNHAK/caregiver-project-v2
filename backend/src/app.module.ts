import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configurationYaml from '../config/configuration.yaml';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurationYaml]
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

