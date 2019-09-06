import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IMarkerDTO } from './marker.dto';
import { MarkersService } from './markers.service';

@Controller('api/markers')
export class MarkersController implements IController<IMarkerDTO> {
  constructor(private readonly service: MarkersService) {}

  @Get()
  async getAll(): Promise<IMarkerDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IMarkerDTO): IMarkerDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IMarkerDTO): IMarkerDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IMarkerDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IMarkerDTO): IMarkerDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IMarkerDTO {
    throw new Error('Method not implemented.');
  }
}
