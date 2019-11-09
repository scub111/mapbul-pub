import { Controller, Get, Post, Put, Delete, Param, UseInterceptors } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IFavoritesMarkerDTO } from 'server/api/favoritesmarkers/favoritesMarker.dto';
import { FavoritesMarkersService } from 'server/api/favoritesmarkers/favoritesMarkers.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';

@Controller('api/favoritesmarkers')
export class FavoritesMarkersController implements IController<IFavoritesMarkerDTO> {
  constructor(private readonly service: FavoritesMarkersService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(): Promise<IFavoritesMarkerDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IFavoritesMarkerDTO): IFavoritesMarkerDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IFavoritesMarkerDTO): IFavoritesMarkerDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IFavoritesMarkerDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IFavoritesMarkerDTO): IFavoritesMarkerDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IFavoritesMarkerDTO {
    throw new Error('Method not implemented.');
  }
}
