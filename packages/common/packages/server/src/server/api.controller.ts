import { Controller, Get, Render } from '@nestjs/common';
import { readRouterSync } from 'codegen/routerStorage';

@Controller('api')
export class ApiController {
  @Get()
  @Render('api')
  root() {
    const apiText = readRouterSync();
    const apiInits = apiText.split(/\r?\n/);
    const apis = [];
    apiInits.forEach(item => {
      if (item !== '') {
        apis.push(`/${item.trim()}`);
      }
    });
    return { message: 'Hello, API!', apis };
  }
}
