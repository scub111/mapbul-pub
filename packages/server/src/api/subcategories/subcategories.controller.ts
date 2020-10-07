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
import { PageContent, ISubcategoryDTO, IGetAllQuery } from '@mapbul-pub/types';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoryDTO } from './subcategories.dto';
import { NotFoundInterceptor } from 'interceptors';
import { JwtAuthGuard } from '../auth';

@Controller('api/subcategories')
export class SubcategoriesController implements IController<ISubcategoryDTO> {
  constructor(private readonly service: SubcategoriesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<ISubcategoryDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async postItem(@Body() body: SubcategoryDTO): Promise<ISubcategoryDTO> {
    return await this.service.postItem(body);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<ISubcategoryDTO> {
    return await this.service.getItem(params.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async putItem(@Param('id') id: string, @Body() body: SubcategoryDTO): Promise<ISubcategoryDTO> {
    return await this.service.putItem(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async deleteItem(@Param('id') id: string): Promise<ISubcategoryDTO> {
    return await this.service.deleteItem(id);
  }
}
