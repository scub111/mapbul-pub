import { Controller, Get, Render } from '@nestjs/common';
import { readRouterSync } from '@mapbul-pub/codegen';

@Controller('api')
export class ApiController {
  @Get()
  @Render('api')
  root() {
    const apiText = readRouterSync(`${__dirname}/api.txt`);
    const apiInits = apiText.split(/\r?\n/);
    const apis: string[] = [];
    apiInits.forEach((item: string) => {
      if (item !== '') {
        apis.push(`/${item.trim()}`);
      }
    });
    return { message: 'Hello, API2!', apis };
  }
}
