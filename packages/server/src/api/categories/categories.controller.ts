import { Controller, Get, Param, UseInterceptors, Query, Put, Body, Post, Delete, UseGuards } from '@nestjs/common';
import { IController } from 'serverSrc/common/IController';
import { PageContent, ICategoryDTO, IGetAllQuery } from '@mapbul-pub/types';
import { CategoriesService } from 'serverSrc/api/categories/categories.service';
import { NotFoundInterceptor } from 'serverSrc/interceptors/NotFoundInterceptor';
import { IRemoveResult, IGetParams } from 'serverSrc/common/interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
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
  async getItem(@Param () params: IGetParams): Promise<ICategoryDTO> {
    return await this.service.getItem(params.id);
  }

  //@Delete()
  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async putItem(@Param('id') id: string, @Body() body: ICategoryDTO): Promise<ICategoryDTO> {
    return await this.service.putItem(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async deleteItem(@Param('id') id: string): Promise<IRemoveResult> {
    return await this.service.deleteItem(id);
  }
}
