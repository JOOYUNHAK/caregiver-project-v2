import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configurationYaml from '../config/configuration.yaml';
import { UserModule } from './user/user.module';
import { SearchModule } from './search/search.module';
import { TasksModule } from './tasks/tasks.module';
import { ProfileModule } from './profile/profile.module';
import { ChatModule } from './Chat/chat.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurationYaml]
    }),
    AuthModule,
    UserModule,
    SearchModule,
    TasksModule,
    ProfileModule,
    ChatModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

