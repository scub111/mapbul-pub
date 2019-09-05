import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IController } from 'server/common/IController';
import { IArticlesubcategoryDTO } from 'server/articlesubcategories/articlesubcategory.dto';
import { ArticlesubcategoriesService } from './articlesubcategories.service';
import { IGetParams } from 'server/common/interfaces';

@Controller('articlesubcategories')
export class ArticlesubcategoriesController implements IController<IArticlesubcategoryDTO> {
  constructor(private readonly service: ArticlesubcategoriesService) {}

  @Get()
  async getAll(): Promise<IArticlesubcategoryDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IArticlesubcategoryDTO): IArticlesubcategoryDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IArticlesubcategoryDTO): IArticlesubcategoryDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IArticlesubcategoryDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IArticlesubcategoryDTO): IArticlesubcategoryDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IArticlesubcategoryDTO {
    throw new Error('Method not implemented.');
  }
}
