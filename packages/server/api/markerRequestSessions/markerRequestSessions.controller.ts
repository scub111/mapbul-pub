import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IMarkerRequestSessionDTO } from './markerRequestSession.dto';
import { MarkerRequestSessionsService } from './markerRequestSessions.service';

@Controller('api/markerrequestsessions')
export class MarkerRequestSessionsController implements IController<IMarkerRequestSessionDTO> {
  constructor(private readonly service: MarkerRequestSessionsService) {}

  @Get()
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
