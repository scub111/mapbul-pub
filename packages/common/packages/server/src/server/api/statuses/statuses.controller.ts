import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IStatusDTO } from './status.dto';
import { StatusesService } from './statuses.service';

@Controller('api/statuses')
export class StatusesController implements IController<IStatusDTO> {
  constructor(private readonly service: StatusesService) {}

  @Get()
  async getAll(): Promise<IStatusDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IStatusDTO): IStatusDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IStatusDTO): IStatusDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IStatusDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IStatusDTO): IStatusDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IStatusDTO {
    throw new Error('Method not implemented.');
  }
}
