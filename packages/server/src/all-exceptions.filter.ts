import { Catch, ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    let response = host.switchToHttp().getResponse();
    let status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.UNAUTHORIZED) return response.status(status).render(`${__dirname}/views/401`);
    else if (status === HttpStatus.FORBIDDEN) return response.status(status).render(`${__dirname}/views/403`);
    else if (status === HttpStatus.NOT_FOUND) return response.status(status).render(`${__dirname}/views/404`);
    else {
      if (process.env.NODE_ENV === 'production') {
        console.error(error.stack);
        return response.status(status).render('views/500');
      } else {
        // let message = error.stack;
        let message;
        if (typeof error === 'string') {
          message = error;
        } else if ('stack' in error) {
          message = error.stack;
        }
        return response.status(status).send(message);
      }
    }
  }
}
