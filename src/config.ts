import { config as dotenvConfig } from 'dotenv';
import { install as installSourceMap } from 'source-map-support';
import { string, type, literal, union, Errors, identity } from 'io-ts';
import { fromNullable } from 'io-ts-types/lib/fromNullable';
import { NumberFromString } from 'io-ts-types/lib/NumberFromString';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/Either';
import { failure } from 'io-ts/lib/PathReporter';

dotenvConfig();
installSourceMap();

const Env = type({
  NODE_ENV: fromNullable(
    union([literal('development'), literal('test'), literal('production')]),
    'production',
  ),
  HOST: fromNullable(string, 'localhost'),
  PORT: fromNullable(NumberFromString, 3000),
});

const env = pipe(
  Env.decode(process.env),
  fold((left: Errors) => {
    throw new Error(failure(left).toString());
  }, identity),
);

export const appConfig = {
  host: env.HOST,
  port: env.PORT,
  isDevelopment: env.NODE_ENV === 'development',
};
