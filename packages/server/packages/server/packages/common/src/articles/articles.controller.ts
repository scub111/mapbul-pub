import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Inject
} from '@nestjs/common';
// import { IController } from 'src/common/IController';
import { IArticleDTO } from './dto/article.dto';
import { TID } from 'src/common/types';
import { IService } from 'src/common/IService';
import { IController } from '../common/IController';

@Controller('articles')
export class ArticlesController implements IController<IArticleDTO> {
  constructor(
    @Inject('IService') private readonly articleService: IService<IArticleDTO>
  ) {}

  @Get()
  async getAll(): Promise<IArticleDTO[]> {
    return this.articleService.getAll();
  }

  @Post()
  postItem(item: IArticleDTO): IArticleDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IArticleDTO): IArticleDTO {
    throw new Error('Method not implemented.');
  }

  getItem(id: TID): IArticleDTO {
    throw new Error('Method not implemented.');
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IArticleDTO): IArticleDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IArticleDTO {
    throw new Error('Method not implemented.');
  }
}
