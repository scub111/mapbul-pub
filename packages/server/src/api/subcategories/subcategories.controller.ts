import { Controller, Get, Param, UseInterceptors, Query } from '@nestjs/common';
import { IGetParams } from 'serverSrc/common/interfaces';
import { IController } from 'serverSrc/common/IController';
import { PageContent, ISubcategoryDTO } from '@mapbul-pub/types';
import { SubcategoriesService } from 'serverSrc/api/subcategories/subcategories.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';
import { GetAllQueryDTO } from 'serverSrc/common/QueryDTO';

@Controller('api/subcategories')
export class SubcategoriesController implements IController<ISubcategoryDTO> {
  constructor(private readonly service: SubcategoriesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: GetAllQueryDTO): Promise<PageContent<ISubcategoryDTO>> {
    return this.service.getAll(query);
  }

  //@Post()
  //postItem(item: ISubcategoryDTO): ISubcategoryDTO {
  //  throw new Error('Method not implemented.');
  //}

  //@Put()
  //putAll(item: ISubcategoryDTO): ISubcategoryDTO {
  //  throw new Error('Method not implemented.');
  //}

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<ISubcategoryDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  //@Put(':id')
  //putItem(id: TID, item: ISubcategoryDTO): ISubcategoryDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): ISubcategoryDTO {
  //  throw new Error('Method not implemented.');
  //}
}
