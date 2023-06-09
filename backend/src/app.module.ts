import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { SearchModule } from './search/search.module';
import { TasksModule } from './tasks/tasks.module';
import { ProfileModule } from './profile/profile.module';
import { ChatModule } from './Chat/chat.module';
import { PaymentModule } from './payment/payment.module';
import databaseConfiguration from 'config/database.configuration';
import serviceConfiguration from 'config/service.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfiguration, serviceConfiguration]
    }),
    AuthModule,
    UserModule,
    SearchModule,
    TasksModule,
    ProfileModule,
    ChatModule,
    PaymentModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

