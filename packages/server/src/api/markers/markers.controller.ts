import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { PageContent, IMarkerDTO } from '@mapbul-pub/types';
import { MarkersService } from 'server/api/markers/markers.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

@Controller('api/markers')
export class MarkersController implements IController<IMarkerDTO> {
  constructor(private readonly service: MarkersService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: GetAllQueryDTO): Promise<PageContent<IMarkerDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: IMarkerDTO): IMarkerDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: IMarkerDTO): IMarkerDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IMarkerDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: IMarkerDTO): IMarkerDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IMarkerDTO {
  //  throw new Error('Method not implemented.');
  //}
}
