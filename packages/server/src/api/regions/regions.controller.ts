import { Controller, Get, Post, Put, Delete, Param, UseInterceptors, Query } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { PageContent, IRegionDTO } from '@mapbul-pub/types';
import { RegionsService } from 'server/api/regions/regions.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

@Controller('api/regions')
export class RegionsController implements IController<IRegionDTO> {
  constructor(private readonly service: RegionsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: GetAllQueryDTO): Promise<PageContent<IRegionDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  postItem(item: IRegionDTO): IRegionDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IRegionDTO): IRegionDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IRegionDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IRegionDTO): IRegionDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IRegionDTO {
    throw new Error('Method not implemented.');
  }
}
