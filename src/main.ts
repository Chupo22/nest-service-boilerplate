import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@modules';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line
  // type-coverage:ignore-next-line
  require('dotenv').config();
  // tslint:disable-next-line
  // type-coverage:ignore-next-line
  require('source-map-support').install();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const host = config.env.HOST;
  const port = config.env.PORT;

  await app.listen(port, host);

  Logger.log(`Listening on ${host}:${port}`, 'NestApplication');
}

bootstrap();
