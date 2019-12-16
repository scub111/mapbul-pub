import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, IMarkerPhotosDTO } from '@mapbul-pub/types';
import { MarkerPhotosService } from 'serverSrc/api/markerPhotos/markerPhotos.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';
import { GetAllQueryDTO } from 'serverSrc/common/QueryDTO';

@Controller('api/markerphotos')
export class MarkerPhotosController implements IController<IMarkerPhotosDTO> {
  constructor(private readonly service: MarkerPhotosService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: GetAllQueryDTO): Promise<PageContent<IMarkerPhotosDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: IMarkerPhotosDTO): IMarkerPhotosDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: IMarkerPhotosDTO): IMarkerPhotosDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IMarkerPhotosDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: IMarkerPhotosDTO): IMarkerPhotosDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IMarkerPhotosDTO {
  //  throw new Error('Method not implemented.');
  //}
}
