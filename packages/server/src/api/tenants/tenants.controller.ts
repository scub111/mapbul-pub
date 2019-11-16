import { Controller, Get, Post, Put, Delete, Param, UseInterceptors, Query } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { Pagination, ITenantDTO } from '@mapbul-pub/types';
import { TenantsService } from 'server/api/tenants/tenants.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

@Controller('api/tenants')
export class TenantsController implements IController<ITenantDTO> {
  constructor(private readonly service: TenantsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: GetAllQueryDTO): Promise<Pagination<ITenantDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  postItem(item: ITenantDTO): ITenantDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: ITenantDTO): ITenantDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<ITenantDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: ITenantDTO): ITenantDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): ITenantDTO {
    throw new Error('Method not implemented.');
  }
}
