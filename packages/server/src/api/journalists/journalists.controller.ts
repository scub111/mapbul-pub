import { Controller, Get, Post, Put, Delete, Param, UseInterceptors, Query } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { Pagination, IJournalistDTO } from '@mapbul-pub/types';
import { JournalistsService } from 'server/api/journalists/journalists.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

@Controller('api/journalists')
export class JournalistsController implements IController<IJournalistDTO> {
  constructor(private readonly service: JournalistsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: GetAllQueryDTO): Promise<Pagination<IJournalistDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  postItem(item: IJournalistDTO): IJournalistDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IJournalistDTO): IJournalistDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IJournalistDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IJournalistDTO): IJournalistDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IJournalistDTO {
    throw new Error('Method not implemented.');
  }
}
