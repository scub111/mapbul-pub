import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IFavoritesArticleDTO } from './favoritesArticle.dto';
import { FavoritesArticlesService } from './favoritesArticles.service';

@Controller('api/favoritesarticles')
export class FavoritesArticlesController implements IController<IFavoritesArticleDTO> {
  constructor(private readonly service: FavoritesArticlesService) {}

  @Get()
  async getAll(): Promise<IFavoritesArticleDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IFavoritesArticleDTO): IFavoritesArticleDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IFavoritesArticleDTO): IFavoritesArticleDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<IFavoritesArticleDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IFavoritesArticleDTO): IFavoritesArticleDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IFavoritesArticleDTO {
    throw new Error('Method not implemented.');
  }
}
