import { Controller, Get, Post, Put, Delete, Param, UseInterceptors } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { ICategoryDTO } from '@mapbul-pub/types';
import { CategoriesService } from 'server/api/categories/categories.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';

@Controller('api/categories')
export class CategoriesController implements IController<ICategoryDTO> {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(): Promise<ICategoryDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: ICategoryDTO): ICategoryDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: ICategoryDTO): ICategoryDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<ICategoryDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: ICategoryDTO): ICategoryDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): ICategoryDTO {
    throw new Error('Method not implemented.');
  }
}
