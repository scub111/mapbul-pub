import { Catch, ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

interface IErrorResponse {
  statusCode?: number;
  error?: string;
  message?: string;
  stack?: string;
  errorRaw?: object;
}

//const getMessage = () => {}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    let response = host.switchToHttp().getResponse();
    let status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.UNAUTHORIZED) return response.status(status).render(`${__dirname}/views/401`);
    else if (status === HttpStatus.FORBIDDEN) return response.status(status).render(`${__dirname}/views/403`);
    else if (status === HttpStatus.NOT_FOUND) return response.status(status).render(`${__dirname}/views/404`);
    else {
      // if (process.env.NODE_ENV === 'production') {
      // let message;
      // if (typeof error === 'string') {
      //   message = error;
      // } else if ('stack' in error) {
      //   message = error.stack;
      // }
      let errorRaw = error;
      if ('response' in error) {
        errorRaw = (error as any).response;
      }

      let message: IErrorResponse = { statusCode: status, errorRaw, message: 'test' };
      if (typeof error === 'string') {
        message.error = error;
      } else if ('stack' in error) {
        message.stack = error.stack;
      }
      return response.status(status).send(message);
    }
  }
}
