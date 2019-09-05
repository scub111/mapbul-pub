import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IController } from 'server/common/IController';
import { IMarker_request_sessionDTO } from 'server/marker_request_sessions/marker_request_session.dto';
import { Marker_request_sessionsService } from './marker_request_sessions.service';
import { IGetParams } from 'server/common/interfaces';

@Controller('marker_request_sessions')
export class Marker_request_sessionsController implements IController<IMarker_request_sessionDTO> {
  constructor(private readonly service: Marker_request_sessionsService) {}

  @Get()
  async getAll(): Promise<IMarker_request_sessionDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IMarker_request_sessionDTO): IMarker_request_sessionDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IMarker_request_sessionDTO): IMarker_request_sessionDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IMarker_request_sessionDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IMarker_request_sessionDTO): IMarker_request_sessionDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IMarker_request_sessionDTO {
    throw new Error('Method not implemented.');
  }
}
