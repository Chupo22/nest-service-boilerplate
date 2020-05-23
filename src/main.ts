import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { AppConfigService } from '@app/app-config.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AppConfigService);
  const logger = app.get(Logger);
  const { host, port } = configService;

  if (configService.isDevelopment) {
    require('source-map-support').install();
  }

  await app.listen(port, host);

  logger.log(`Listening on ${host}:${port}`, 'NestApplication');
}

bootstrap();
