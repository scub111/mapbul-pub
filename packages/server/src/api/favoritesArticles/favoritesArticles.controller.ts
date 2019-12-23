import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, IFavoritesArticleDTO, IGetAllQuery } from '@mapbul-pub/types';
import { FavoritesArticlesService } from 'serverSrc/api/favoritesArticles/favoritesArticles.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';

@Controller('api/favoritesarticles')
export class FavoritesArticlesController implements IController<IFavoritesArticleDTO> {
  constructor(private readonly service: FavoritesArticlesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IFavoritesArticleDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: IFavoritesArticleDTO): IFavoritesArticleDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: IFavoritesArticleDTO): IFavoritesArticleDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IFavoritesArticleDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: IFavoritesArticleDTO): IFavoritesArticleDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IFavoritesArticleDTO {
  //  throw new Error('Method not implemented.');
  //}
}
