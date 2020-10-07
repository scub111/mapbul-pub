import { 
  Controller,
  Get,
  Param,
  Request,
  UseInterceptors,
  Query,
  Put,
  Body,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IController, IGetParams, IRequest } from 'interfaces';
import { PageContent, IArticleDTO, IGetAllQuery } from '@mapbul-pub/types';
import { ArticlesService } from './articles.service';
import { ArticleDTO } from './articles.dto';
import { NotFoundInterceptor } from 'interceptors';
import { JwtAuthGuard } from '../auth';

@Controller('api/articles')
export class ArticlesController implements IController<IArticleDTO> {
  constructor(private readonly service: ArticlesService) {}

  @Get()
  @UseInterceptors(NotFoundInterceptor)
  async getAll(@Query() query: IGetAllQuery): Promise<PageContent<IArticleDTO>> {
    return this.service.getAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async postItem(@Body() body: ArticleDTO, @Request() req: IRequest): Promise<IArticleDTO> {
    return await this.service.postItem(body, req);
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IArticleDTO> {
    return await this.service.getItem(params.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async putItem(@Param('id') id: string, @Body() body: ArticleDTO, @Request() req: IRequest): Promise<IArticleDTO> {
    return await this.service.putItem(id, body, req);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NotFoundInterceptor)
  async deleteItem(@Param('id') id: string): Promise<IArticleDTO> {
    return await this.service.deleteItem(id);
  }
}
