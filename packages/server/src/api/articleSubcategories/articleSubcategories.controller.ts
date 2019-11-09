import { Controller, Get, Post, Put, Delete, Param, UseInterceptors } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IArticleSubcategoryDTO } from 'server/api/articlesubcategories/articleSubcategory.dto';
import { ArticleSubcategoriesService } from 'server/api/articlesubcategories/articleSubcategories.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';

@Controller('api/articlesubcategories')
export class ArticleSubcategoriesController implements IController<IArticleSubcategoryDTO> {
  constructor(private readonly service: ArticleSubcategoriesService) {}

  @Get()
  async getAll(): Promise<IArticleSubcategoryDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IArticleSubcategoryDTO): IArticleSubcategoryDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IArticleSubcategoryDTO): IArticleSubcategoryDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IArticleSubcategoryDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IArticleSubcategoryDTO): IArticleSubcategoryDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IArticleSubcategoryDTO {
    throw new Error('Method not implemented.');
  }
}
