import { Controller, Get, Param, UseInterceptors, Query, Put, Body, Post, Delete, UseGuards } from '@nestjs/common';
import { IController, IGetParams } from 'interfaces';
import { PageContent, IMarkerRequestSessionDTO, IGetAllQuery } from '@mapbul-pub/types';
import { MarkerRequestSessionsService } from './markerRequestSessions.service';
import { MarkerRequestSessionDTO } from './markerRequestSessions.dto';
import { NotFoundInterceptor } from 'interceptors';
import { JwtAuthGuard } from '../auth';

@Controller('api/markerrequestsessions')
export class MarkerRequestSessionsController implements IController<IMarkerRequestSessionDTO> {
  constructor(private readonly service: MarkerRequestSessionsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IMarkerRequestSessionDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async postItem(@Body() body: MarkerRequestSessionDTO): Promise<IMarkerRequestSessionDTO> {
    return await this.service.postItem(body);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IMarkerRequestSessionDTO> {
    return await this.service.getItem(params.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async putItem(@Param('id') id: string, @Body() body: MarkerRequestSessionDTO): Promise<IMarkerRequestSessionDTO> {
    return await this.service.putItem(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async deleteItem(@Param('id') id: string): Promise<IMarkerRequestSessionDTO> {
    return await this.service.deleteItem(id);
  }
}
