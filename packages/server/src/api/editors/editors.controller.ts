import { Controller, Get, Param, UseInterceptors, Query, Put, Body, Post, Delete, UseGuards } from '@nestjs/common';
import { IController, IGetParams } from 'common';
import { PageContent, IEditorDTO, IGetAllQuery } from '@mapbul-pub/types';
import { EditorsService } from './editors.service';
import { NotFoundInterceptor } from 'interceptors';
import { JwtAuthGuard } from '../auth';

@Controller('api/editors')
export class EditorsController implements IController<IEditorDTO> {
  constructor(private readonly service: EditorsService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IEditorDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async postItem(@Body() body: IEditorDTO): Promise<IEditorDTO> {
    return await this.service.postItem(body);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IEditorDTO> {
    return await this.service.getItem(params.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async putItem(@Param('id') id: string, @Body() body: IEditorDTO): Promise<IEditorDTO> {
    return await this.service.putItem(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async deleteItem(@Param('id') id: string): Promise<IEditorDTO> {
    return await this.service.deleteItem(id);
  }
}
