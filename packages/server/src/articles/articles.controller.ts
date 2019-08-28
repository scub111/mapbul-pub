import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { IController } from 'src/common/IController';
import { IArticleDTO } from './dto/article.dto';
import { TID } from 'src/common/types';

@Controller('articles')
export class ArticlesController implements IController<IArticleDTO> {
    constructor(private articleService: ArticlesService) {}

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
