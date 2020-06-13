import { Module, Logger } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { ConfigModule, ConfigService } from '@modules';
import { AppService } from '@services';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService, ConfigService, Logger],
})
export class AppModule {}
