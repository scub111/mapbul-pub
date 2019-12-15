import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { PageContent, IFavoritesMarkerDTO } from '@mapbul-pub/types';
import { FavoritesMarkersService } from 'server/api/favoritesMarkers/favoritesMarkers.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

@Controller('api/favoritesmarkers')
export class FavoritesMarkersController implements IController<IFavoritesMarkerDTO> {
  constructor(private readonly service: FavoritesMarkersService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: GetAllQueryDTO): Promise<PageContent<IFavoritesMarkerDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: IFavoritesMarkerDTO): IFavoritesMarkerDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: IFavoritesMarkerDTO): IFavoritesMarkerDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IFavoritesMarkerDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: IFavoritesMarkerDTO): IFavoritesMarkerDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IFavoritesMarkerDTO {
  //  throw new Error('Method not implemented.');
  //}
}
