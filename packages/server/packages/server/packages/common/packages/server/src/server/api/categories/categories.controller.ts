import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { ICategoryDTO } from './category.dto';
import { CategoriesService } from './categories.service';

@Controller('api/categories')
export class CategoriesController implements IController<ICategoryDTO> {
  constructor(private readonly service: CategoriesService) {}

  @Get()
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
