import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, IArticleDTO, IGetAllQuery } from '@mapbul-pub/types';
import { ArticlesService } from 'serverSrc/api/articles/articles.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';

@Controller('api/articles')
export class ArticlesController implements IController<IArticleDTO> {
  constructor(private readonly service: ArticlesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IArticleDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: IArticleDTO): IArticleDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: IArticleDTO): IArticleDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IArticleDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: IArticleDTO): IArticleDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IArticleDTO {
  //  throw new Error('Method not implemented.');
  //}
}
