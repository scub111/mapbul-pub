import { Controller, Get, Post, Put, Delete, Inject } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IController } from 'server/common/IController';
import { IArticleDTO } from 'server/articles/article.dto';
import { ArticlesService } from 'server/articles/articles.service';

@Controller('articles')
export class ArticlesController implements IController<IArticleDTO> {
  constructor(private readonly articleService: ArticlesService) {}

  @Get()
  async getAll(): Promise<IArticleDTO[]> {
    return this.articleService.getAll();
  }

  @Post()
  postItem(item: IArticleDTO): IArticleDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IArticleDTO): IArticleDTO {
    throw new Error('Method not implemented.');
  }

  getItem(id: TID): IArticleDTO {
    throw new Error('Method not implemented.');
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