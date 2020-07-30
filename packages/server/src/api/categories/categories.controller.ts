import { Controller, Get, Param, UseInterceptors, Query, Put, Body, Post } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, ICategoryDTO, IGetAllQuery } from '@mapbul-pub/types';
import { CategoriesService } from 'serverSrc/api/categories/categories.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';

@Controller('api/categories')
export class CategoriesController implements IController<ICategoryDTO> {
  constructor(private readonly service: CategoriesService) { }

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<ICategoryDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: ICategoryDTO): ICategoryDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Post()
  @UseInterceptors(NotFoundInterceptor)
  async postItem(@Body() body: ICategoryDTO): Promise<ICategoryDTO> {
    return await this.service.postItem(body);
  }

  //@Put()
  //putAll(item: ICategoryDTO): ICategoryDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<any> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  @Put(':id')
  @UseInterceptors(NotFoundInterceptor)
  async putItem(@Param('id') id: string, @Body() body: ICategoryDTO): Promise<ICategoryDTO> {
    return await this.service.putItem(id, body);
  }

  //deleteItem(id: TID): ICategoryDTO {
  //  throw new Error('Method not implemented.');
  //}
}
