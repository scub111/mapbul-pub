import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IController } from 'server/common/IController';
import { IFavorites_markerDTO } from 'server/favorites_markers/favorites_marker.dto';
import { Favorites_markersService } from './favorites_markers.service';
import { IGetParams } from 'server/common/interfaces';

@Controller('favorites_markers')
export class Favorites_markersController implements IController<IFavorites_markerDTO> {
  constructor(private readonly service: Favorites_markersService) {}

  @Get()
  async getAll(): Promise<IFavorites_markerDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IFavorites_markerDTO): IFavorites_markerDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IFavorites_markerDTO): IFavorites_markerDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IFavorites_markerDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IFavorites_markerDTO): IFavorites_markerDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IFavorites_markerDTO {
    throw new Error('Method not implemented.');
  }
}
