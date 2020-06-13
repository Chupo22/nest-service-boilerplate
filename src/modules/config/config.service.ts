// type-coverage:ignore-next-line
require('dotenv').config();

import { Injectable, Logger } from '@nestjs/common';
import { isLeft } from 'fp-ts/lib/These';
import { string, type, literal, union } from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { fromNullable } from 'io-ts-types/lib/fromNullable';
import { NumberFromString } from 'io-ts-types/lib/NumberFromString';

const envType = type({
  NODE_ENV: fromNullable(
    union([literal('development'), literal('test'), literal('production')]),
    'production',
  ),
  HOST: fromNullable(string, 'localhost'),
  PORT: fromNullable(NumberFromString, 3000),
});

type TEnv = typeof envType['_A'];

@Injectable()
export class ConfigService {
  private readonly env: TEnv;

  constructor(private readonly logger: Logger) {
    const env = envType.decode(process.env);

    if (isLeft(env)) {
      // TODO: задать формат ошибки
      this.logger.error(PathReporter.report(env).toString());
      throw new Error('Env validation failed');
    }

    this.env = env.right;

    if (this.isDevelopment) {
      // type-coverage:ignore-next-line
      require('source-map-support').install();
    }
  }

  get host() {
    return this.env.HOST;
  }

  get port() {
    return this.env.PORT;
  }

  get isDevelopment() {
    return this.env.NODE_ENV === 'development';
  }
}
