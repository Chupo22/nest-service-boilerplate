import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from '@services';
import {
  ConfigModule,
  LoggerModule,
  ConfigService,
  LoggerService,
} from '@modules';

@Module({
  imports: [ConfigModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService, ConfigService, LoggerService],
  exports: [ConfigService, LoggerService],
})
export class AppModule {}
