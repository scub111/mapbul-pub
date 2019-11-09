import { Controller, Get, Post, Put, Delete, Param, UseInterceptors } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IMarkerRequestSessionDTO } from 'server/api/markerrequestsessions/markerRequestSession.dto';
import { MarkerRequestSessionsService } from 'server/api/markerrequestsessions/markerRequestSessions.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';

@Controller('api/markerrequestsessions')
export class MarkerRequestSessionsController implements IController<IMarkerRequestSessionDTO> {
  constructor(private readonly service: MarkerRequestSessionsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(): Promise<IMarkerRequestSessionDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IMarkerRequestSessionDTO): IMarkerRequestSessionDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IMarkerRequestSessionDTO): IMarkerRequestSessionDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IMarkerRequestSessionDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IMarkerRequestSessionDTO): IMarkerRequestSessionDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IMarkerRequestSessionDTO {
    throw new Error('Method not implemented.');
  }
}
