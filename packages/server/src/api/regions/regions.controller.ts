import { Controller, Get, Param, UseInterceptors, Query, Put, Body, Post, Delete, UseGuards } from '@nestjs/common';
import { IController, IGetParams } from 'common';
import { PageContent, IRegionDTO, IGetAllQuery } from '@mapbul-pub/types';
import { RegionsService } from './regions.service';
import { NotFoundInterceptor } from 'interceptors';
import { JwtAuthGuard } from '../auth';

@Controller('api/regions')
export class RegionsController implements IController<IRegionDTO> {
  constructor(private readonly service: RegionsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IRegionDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async postItem(@Body() body: IRegionDTO): Promise<IRegionDTO> {
    return await this.service.postItem(body);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IRegionDTO> {
    return await this.service.getItem(params.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async putItem(@Param('id') id: string, @Body() body: IRegionDTO): Promise<IRegionDTO> {
    return await this.service.putItem(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async deleteItem(@Param('id') id: string): Promise<IRegionDTO> {
    return await this.service.deleteItem(id);
  }
}
