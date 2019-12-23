import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, IUserTypeDTO, IGetAllQuery } from '@mapbul-pub/types';
import { UserTypesService } from 'serverSrc/api/userTypes/userTypes.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';

@Controller('api/usertypes')
export class UserTypesController implements IController<IUserTypeDTO> {
  constructor(private readonly service: UserTypesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IUserTypeDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: IUserTypeDTO): IUserTypeDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: IUserTypeDTO): IUserTypeDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IUserTypeDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: IUserTypeDTO): IUserTypeDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IUserTypeDTO {
  //  throw new Error('Method not implemented.');
  //}
}
