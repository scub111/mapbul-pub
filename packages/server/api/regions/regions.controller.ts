import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IRegionDTO } from './region.dto';
import { RegionsService } from './regions.service';

@Controller('api/regions')
export class RegionsController implements IController<IRegionDTO> {
  constructor(private readonly service: RegionsService) {}

  @Get()
  async getAll(): Promise<IRegionDTO[]> {
    return this.service.getAll();
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
