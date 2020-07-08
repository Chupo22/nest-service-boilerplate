import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { appConfig } from '@config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { host, port } = appConfig;

  await app.listen(port, host);

  Logger.log(`Listening on ${host}:${port}`, 'NestApplication');
}

bootstrap();
