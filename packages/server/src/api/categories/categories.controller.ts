import { 
  Controller,
  Get,
  Param,
  UseInterceptors,
  Query,
  Put,
  Body,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IController, IGetParams } from 'interfaces';
import { PageContent, ICategoryDTO, IGetAllQuery } from '@mapbul-pub/types';
import { CategoriesService } from './categories.service';
import { CategoryDTO } from './categories.dto';
import { NotFoundInterceptor } from 'interceptors';
import { JwtAuthGuard } from '../auth';

@Controller('api/categories')
export class CategoriesController implements IController<ICategoryDTO> {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<ICategoryDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async postItem(@Body() body: CategoryDTO): Promise<ICategoryDTO> {
    return await this.service.postItem(body);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<ICategoryDTO> {
    return await this.service.getItem(params.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async putItem(@Param('id') id: string, @Body() body: CategoryDTO): Promise<ICategoryDTO> {
    return await this.service.putItem(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async deleteItem(@Param('id') id: string): Promise<ICategoryDTO> {
    return await this.service.deleteItem(id);
  }
}
