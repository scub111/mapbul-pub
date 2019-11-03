import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { ISubcategoryDTO } from './subcategory.dto';
import { SubcategoriesService } from './subcategories.service';

@Controller('api/subcategories')
export class SubcategoriesController implements IController<ISubcategoryDTO> {
  constructor(private readonly service: SubcategoriesService) {}

  @Get()
  async getAll(): Promise<ISubcategoryDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: ISubcategoryDTO): ISubcategoryDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: ISubcategoryDTO): ISubcategoryDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  async getItem(@Param() params: IGetParams): Promise<ISubcategoryDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: ISubcategoryDTO): ISubcategoryDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): ISubcategoryDTO {
    throw new Error('Method not implemented.');
  }
}
