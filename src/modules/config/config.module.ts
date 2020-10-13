import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { LoggerService } from '@modules';

@Module({
  providers: [ConfigService, LoggerService],
  exports: [ConfigService],
})
export class ConfigModule {}
