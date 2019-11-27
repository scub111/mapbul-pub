import { Controller, Get, Post, Put, Delete, Param, UseInterceptors, Query } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { PageContent, IAdminDTO } from '@mapbul-pub/types';
import { AdminsService } from 'server/api/admins/admins.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

@Controller('api/admins')
export class AdminsController implements IController<IAdminDTO> {
  constructor(private readonly service: AdminsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: GetAllQueryDTO): Promise<PageContent<IAdminDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  postItem(item: IAdminDTO): IAdminDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IAdminDTO): IAdminDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IAdminDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IAdminDTO): IAdminDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IAdminDTO {
    throw new Error('Method not implemented.');
  }
}
