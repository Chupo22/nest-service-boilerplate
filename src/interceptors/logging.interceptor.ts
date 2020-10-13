import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoggerService } from '@modules';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor<object> {
  @Inject()
  private readonly logger!: LoggerService;

  intercept(
    context: ExecutionContext,
    next: CallHandler<object>,
  ): Observable<object> {
    const handlerName = context.getHandler().name;
    // type-coverage:ignore-next-line
    const request = context.getArgByIndex(0) as Request;
    // type-coverage:ignore-next-line
    const loggerContext = handlerName + ':' + request.route.path;

    this.logger.log(
      // type-coverage:ignore-next-line
      `BEGIN EXECUTION: ${JSON.stringify(request.body)}`,
      loggerContext,
    );

    const now = Date.now();

    return next.handle().pipe(
      tap(() =>
        this.logger.log(
          `END EXECUTION:  in ${Date.now() - now} ms`,
          loggerContext,
        ),
      ),
      catchError((e: Error) => {
        this.logger.error(
          `END EXECUTION WITH ERROR: Error message "${e.message}" in ${
            Date.now() - now
          } ms`,
          loggerContext,
        );
        return throwError(e);
      }),
    );
  }
}
