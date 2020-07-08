import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from '@services';

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
