import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, IMarkerRequestSessionDTO } from '@mapbul-pub/types';
import { MarkerRequestSessionsService } from 'serverSrc/api/markerRequestSessions/markerRequestSessions.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';
import { GetAllQueryDTO } from 'serverSrc/common/QueryDTO';

@Controller('api/markerrequestsessions')
export class MarkerRequestSessionsController implements IController<IMarkerRequestSessionDTO> {
  constructor(private readonly service: MarkerRequestSessionsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: GetAllQueryDTO): Promise<PageContent<IMarkerRequestSessionDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: IMarkerRequestSessionDTO): IMarkerRequestSessionDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: IMarkerRequestSessionDTO): IMarkerRequestSessionDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IMarkerRequestSessionDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: IMarkerRequestSessionDTO): IMarkerRequestSessionDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IMarkerRequestSessionDTO {
  //  throw new Error('Method not implemented.');
  //}
}
