import { Module, Logger } from '@nestjs/common';
import { ConfigService } from './config.service';
import { LoggerModule } from '@app/modules';

@Module({
  imports: [LoggerModule],
  providers: [Logger, ConfigService],
  exports: [Logger, ConfigService],
})
export class ConfigModule {}
