import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, IUserDTO, IGetAllQuery } from '@mapbul-pub/types';
import { UsersService } from 'serverSrc/api/users/users.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';

@Controller('api/users')
export class UsersController implements IController<IUserDTO> {
  constructor(private readonly service: UsersService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IUserDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: IUserDTO): IUserDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: IUserDTO): IUserDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IUserDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: IUserDTO): IUserDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IUserDTO {
  //  throw new Error('Method not implemented.');
  //}
}
