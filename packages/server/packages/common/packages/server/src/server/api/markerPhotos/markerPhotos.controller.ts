import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IMarkerPhotosDTO } from './markerPhotos.dto';
import { MarkerPhotosService } from './markerPhotos.service';

@Controller('api/markerphotos')
export class MarkerPhotosController implements IController<IMarkerPhotosDTO> {
  constructor(private readonly service: MarkerPhotosService) {}

  @Get()
  async getAll(): Promise<IMarkerPhotosDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IMarkerPhotosDTO): IMarkerPhotosDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IMarkerPhotosDTO): IMarkerPhotosDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IMarkerPhotosDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IMarkerPhotosDTO): IMarkerPhotosDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IMarkerPhotosDTO {
    throw new Error('Method not implemented.');
  }
}
