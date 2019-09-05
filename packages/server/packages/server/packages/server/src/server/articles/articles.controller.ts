import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IController } from 'server/common/IController';
import { IArticleDTO } from 'server/articles/article.dto';
import { ArticlesService } from './articles.service';
import { IGetParams } from 'server/common/interfaces';

@Controller('articles')
export class ArticlesController implements IController<IArticleDTO> {
  constructor(private readonly service: ArticlesService) {}

  @Get()
  async getAll(): Promise<IArticleDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IArticleDTO): IArticleDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IArticleDTO): IArticleDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IArticleDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IArticleDTO): IArticleDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IArticleDTO {
    throw new Error('Method not implemented.');
  }
}
