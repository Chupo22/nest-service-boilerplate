import { Module, Logger } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService, validationSchema } from '@app/app-config.service';

@Module({
  imports: [ConfigModule.forRoot({ validationSchema })],
  controllers: [AppController],
  providers: [AppService, AppConfigService, Logger],
})
export class AppModule {}
