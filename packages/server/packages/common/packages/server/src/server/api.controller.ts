import { Controller, Get, Render } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get()
  @Render('api')
  root() {
    return { message: 'Hello, API!' };
  }
}
