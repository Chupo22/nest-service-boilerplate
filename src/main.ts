import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const logger = app.get(Logger);
  const { host, port } = configService;

  await app.listen(port, host);

  logger.log(`Listening on ${host}:${port}`, 'NestApplication');
}

bootstrap();
