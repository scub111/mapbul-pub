import { Controller, Get, Render } from '@nestjs/common';
import { parseRouterSync } from '@mapbul-pub/codegen';

@Controller('api')
export class ApiController {
  @Get()
  @Render('api')
  root() {
    const apiText = parseRouterSync(`${__dirname}/api.txt`);
    const apiInits = apiText.map(i => i.router);
    const apis: string[] = [];
    apiInits.forEach((item: string) => {
      if (item !== '') {
        apis.push(`/${item.trim()}`);
      }
    });
    return { title: 'API list!!!', apis };
  }
}
