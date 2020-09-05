import { Controller, Get, Param, UseInterceptors, Query, Put, Body, Post, Delete, UseGuards } from '@nestjs/common';
import { IController, IGetParams } from 'common';
import { PageContent, IJournalistDTO, IGetAllQuery } from '@mapbul-pub/types';
import { JournalistsService } from './journalists.service';
import { NotFoundInterceptor } from 'interceptors';
import { JwtAuthGuard } from '../auth';

@Controller('api/journalists')
export class JournalistsController implements IController<IJournalistDTO> {
  constructor(private readonly service: JournalistsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IJournalistDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async postItem(@Body() body: IJournalistDTO): Promise<IJournalistDTO> {
    return await this.service.postItem(body);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IJournalistDTO> {
    return await this.service.getItem(params.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async putItem(@Param('id') id: string, @Body() body: IJournalistDTO): Promise<IJournalistDTO> {
    return await this.service.putItem(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async deleteItem(@Param('id') id: string): Promise<IJournalistDTO> {
    return await this.service.deleteItem(id);
  }
}
