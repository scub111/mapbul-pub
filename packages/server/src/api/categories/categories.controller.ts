import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, ICategoryDTO } from '@mapbul-pub/types';
import { CategoriesService } from 'serverSrc/api/categories/categories.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';
import { GetAllQueryDTO } from 'serverSrc/common/QueryDTO';

@Controller('api/categories')
export class CategoriesController implements IController<ICategoryDTO> {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: GetAllQueryDTO): Promise<PageContent<ICategoryDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: ICategoryDTO): ICategoryDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: ICategoryDTO): ICategoryDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<ICategoryDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: ICategoryDTO): ICategoryDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): ICategoryDTO {
  //  throw new Error('Method not implemented.');
  //}
}
