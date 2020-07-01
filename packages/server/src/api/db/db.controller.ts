import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
// import { GlobalVar } from '@mapbul-pub/common';

@Controller('api/db')
export class DbController {
  @Get()
  // @Render('db')
  root() {
    // throw "some trouble123";
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // return { dbConnection: GlobalVar.env.dbConnection.host };
    return { dbConnection: "test" };
  }
}
