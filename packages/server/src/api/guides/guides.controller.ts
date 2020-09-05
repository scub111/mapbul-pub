import { Controller, Get, Param, UseInterceptors, Query, Put, Body, Post, Delete, UseGuards } from '@nestjs/common';
import { IController, IGetParams } from 'common';
import { PageContent, IGuideDTO, IGetAllQuery } from '@mapbul-pub/types';
import { GuidesService } from './guides.service';
import { NotFoundInterceptor } from 'interceptors';
import { JwtAuthGuard } from '../auth';

@Controller('api/guides')
export class GuidesController implements IController<IGuideDTO> {
  constructor(private readonly service: GuidesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IGuideDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async postItem(@Body() body: IGuideDTO): Promise<IGuideDTO> {
    return await this.service.postItem(body);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IGuideDTO> {
    return await this.service.getItem(params.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async putItem(@Param('id') id: string, @Body() body: IGuideDTO): Promise<IGuideDTO> {
    return await this.service.putItem(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async deleteItem(@Param('id') id: string): Promise<IGuideDTO> {
    return await this.service.deleteItem(id);
  }
}
