import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, IAdminDTO, IGetAllQuery } from '@mapbul-pub/types';
import { AdminsService } from 'serverSrc/api/admins/admins.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';

@Controller('api/admins')
export class AdminsController implements IController<IAdminDTO> {
  constructor(private readonly service: AdminsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IAdminDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: IAdminDTO): IAdminDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: IAdminDTO): IAdminDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IAdminDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: IAdminDTO): IAdminDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IAdminDTO {
  //  throw new Error('Method not implemented.');
  //}
}
