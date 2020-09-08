import { Catch, ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { IErrorResponse } from 'interfaces';

const getMessage = (error: any): string => {
  if ('message' in error && Array.isArray(error.message)) {
    const errors = error.message as Array<ValidationError>;
    return errors.map(i => Object.values(i.constraints ? i.constraints : {})).join('; ');
  }
  return '';
};

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

      let rawError = error;
      if ('response' in error) {
        rawError = (error as any).response;
      }

      let message: IErrorResponse = {
        error: 'error' in rawError ? (rawError as any).error : '',
        statusCode: status,
        rawError,
        message: getMessage(rawError),
      };

      if (typeof error === 'string') {
        message.error = error;
      } else if ('stack' in error) {
        message.stack = error.stack;
      }
      return response.status(status).send(message);
    }
  }
}
