import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { ICityDTO } from './city.dto';
import { CitiesService } from './cities.service';

@Controller('api/cities')
export class CitiesController implements IController<ICityDTO> {
  constructor(private readonly service: CitiesService) {}

  @Get()
  async getAll(): Promise<ICityDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: ICityDTO): ICityDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: ICityDTO): ICityDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<ICityDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: ICityDTO): ICityDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): ICityDTO {
    throw new Error('Method not implemented.');
  }
}
