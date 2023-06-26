import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {

    const response = host.switchToHttp().getResponse();
    let statusCode: number, message: string;

    /* 400번대면 custom 매세지를 이외에는 표시되는 매세지로 */
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception['response']['message'] instanceof Array ?
            exception['response']['message'][0] : exception['response']['message']
    } else {
      statusCode = 500;
      message = exception['message'];
    }

    response.status(statusCode).send({ statusCode, message })
  }
}

export const GlobalScopedExceptionFilter: any = {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter
}