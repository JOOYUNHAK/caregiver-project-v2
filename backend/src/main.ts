import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './Chat/socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  
  app.enableCors({
    origin: true,
    methods: 'GET, PUT, DELETE, POST',
    credentials: true
  });
  await app.listen(8080);
}
bootstrap();
