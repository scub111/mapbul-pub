import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IController } from 'server/common/IController';
import { IFavorites_articleDTO } from 'server/favorites_articles/favorites_article.dto';
import { Favorites_articlesService } from './favorites_articles.service';
import { IGetParams } from 'server/common/interfaces';

@Controller('favorites_articles')
export class Favorites_articlesController implements IController<IFavorites_articleDTO> {
  constructor(private readonly service: Favorites_articlesService) {}

  @Get()
  async getAll(): Promise<IFavorites_articleDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IFavorites_articleDTO): IFavorites_articleDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IFavorites_articleDTO): IFavorites_articleDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IFavorites_articleDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IFavorites_articleDTO): IFavorites_articleDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IFavorites_articleDTO {
    throw new Error('Method not implemented.');
  }
}
