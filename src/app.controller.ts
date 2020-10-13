import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from '@services';
import { LoggingInterceptor } from '@interceptors';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
