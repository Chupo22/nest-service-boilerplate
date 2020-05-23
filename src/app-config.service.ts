import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

type TEnv = {
  NODE_ENV: string;
  HOST: string;
  PORT: number;
};

export const validationSchema = Joi.object<TEnv>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  HOST: Joi.string().default('localhost'),
  PORT: Joi.number().default(3000),
});

@Injectable()
export class AppConfigService {
  constructor(private readonly nestConfigService: ConfigService) {}

  get host() {
    return this.nestConfigService.get<string>('HOST')!;
  }

  get port() {
    return this.nestConfigService.get<number>('PORT')!;
  }

  get isDevelopment() {
    return this.nestConfigService.get<string>('NODE_ENV')! === 'development';
  }
}
