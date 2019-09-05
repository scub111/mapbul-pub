import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IController } from 'server/common/IController';
import { IArticleDTO } from 'server/articles3/article.dto';
import { Articles3Service } from './articles3.service';

@Controller('articles3')
export class Articles3Controller implements IController<IArticleDTO> {
  constructor(private readonly service: Articles3Service) {}

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
