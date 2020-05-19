import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const host = 'localhost';
  const port = 3000;
  const app = await NestFactory.create(AppModule);

  await app.listen(port, host);

  console.log(`Listening on ${host}:${port}`)
}

bootstrap();
