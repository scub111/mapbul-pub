import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IController } from 'server/common/IController';
import { IMarker_photosDTO } from 'server/marker_photos/marker_photos.dto';
import { Marker_photosService } from './marker_photos.service';
import { IGetParams } from 'server/common/interfaces';

@Controller('marker_photos')
export class Marker_photosController implements IController<IMarker_photosDTO> {
  constructor(private readonly service: Marker_photosService) {}

  @Get()
  async getAll(): Promise<IMarker_photosDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IMarker_photosDTO): IMarker_photosDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IMarker_photosDTO): IMarker_photosDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IMarker_photosDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IMarker_photosDTO): IMarker_photosDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IMarker_photosDTO {
    throw new Error('Method not implemented.');
  }
}
