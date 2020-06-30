import { Controller, Get, Render } from '@nestjs/common';
import { GlobalVar } from '@mapbul-pub/common';

@Controller('api/db')
export class DbController {
  @Get()
  @Render('db')
  root() {
    return { dbConnection: GlobalVar.env.dbConnection.host };
  }
}
