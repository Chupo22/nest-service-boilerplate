import { Injectable } from '@nestjs/common';

import {
  IsIn,
  IsString,
  IsNotEmpty,
  validateSync,
  IsNumber,
} from 'class-validator';
import { plainToClass, Transform } from 'class-transformer';

import { LoggerService } from '@modules';

class EnvDTO {
  @IsString()
  @IsIn(['development', 'production', 'test'])
  @IsNotEmpty()
  NODE_ENV!: 'development' | 'production' | 'test';

  @IsString()
  @IsNotEmpty()
  HOST!: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform((v: string) => +v)
  PORT!: number;
}

@Injectable()
export class ConfigService {
  env: EnvDTO;

  constructor(private readonly logger: LoggerService) {
    const env = plainToClass(EnvDTO, process.env, { strategy: 'exposeAll' });
    const errors = validateSync(
      plainToClass(EnvDTO, process.env, { strategy: 'exposeAll' }),
    );

    if (errors?.length) {
      this.logger.error(errors);
      throw new Error('Env validation error');
    }

    this.env = env;
  }
}
