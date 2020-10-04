import { Controller, Get, Param, Request, UseInterceptors, Query, Put, Body, Post, Delete, UseGuards } from '@nestjs/common';
import { IController, IGetParams, IRequest } from 'interfaces';
import { PageContent, IMarkerDTO, IGetAllQuery } from '@mapbul-pub/types';
import { MarkersService } from './markers.service';
import { MarkerDTO } from './markers.dto';
import { NotFoundInterceptor } from 'interceptors';
import { JwtAuthGuard } from '../auth';

@Controller('api/markers')
export class MarkersController implements IController<IMarkerDTO> {
  constructor(private readonly service: MarkersService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IMarkerDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async postItem(@Body() body: MarkerDTO, @Request() req: IRequest): Promise<IMarkerDTO> {
    return await this.service.postItem(body, req);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IMarkerDTO> {
    return await this.service.getItem(params.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async putItem(@Param('id') id: string, @Body() body: MarkerDTO, @Request() req: IRequest): Promise<IMarkerDTO> {
    return await this.service.putItem(id, body, req);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async deleteItem(@Param('id') id: string): Promise<IMarkerDTO> {
    return await this.service.deleteItem(id);
  }
}
