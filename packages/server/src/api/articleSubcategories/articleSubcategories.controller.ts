import { Controller, Get, Param, UseInterceptors, Query, Put, Body, Post, Delete, UseGuards } from '@nestjs/common';
import { IController, IGetParams } from 'common';
import { PageContent, IArticleSubcategoryDTO, IGetAllQuery } from '@mapbul-pub/types';
import { ArticleSubcategoriesService } from './articleSubcategories.service';
import { NotFoundInterceptor } from 'interceptors';
import { JwtAuthGuard } from '../auth';

@Controller('api/articlesubcategories')
export class ArticleSubcategoriesController implements IController<IArticleSubcategoryDTO> {
  constructor(private readonly service: ArticleSubcategoriesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IArticleSubcategoryDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async postItem(@Body() body: IArticleSubcategoryDTO): Promise<IArticleSubcategoryDTO> {
    return await this.service.postItem(body);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IArticleSubcategoryDTO> {
    return await this.service.getItem(params.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async putItem(@Param('id') id: string, @Body() body: IArticleSubcategoryDTO): Promise<IArticleSubcategoryDTO> {
    return await this.service.putItem(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async deleteItem(@Param('id') id: string): Promise<IArticleSubcategoryDTO> {
    return await this.service.deleteItem(id);
  }
}
