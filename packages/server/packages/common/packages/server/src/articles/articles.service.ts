import * as mysql from 'mysql';
import * as util from 'util';
import { Injectable } from '@nestjs/common';
import { IService } from 'src/common/IService';
import { ArticleDTO } from './dto/article.dto';
import { Connection } from 'mysql';

@Injectable()
export class ArticlesService implements IService<ArticleDTO> {
    constructor() {
        this.mysqlConnection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '461301+MY',
            database: 'mapbul',
        });
        this.mysqlQuery = util.promisify(this.mysqlConnection.query).bind(this.mysqlConnection);
    }
    mysqlConnection: Connection;
    mysqlQuery: any;
    async getAll(): Promise<ArticleDTO[]> {
        const result = await this.mysqlQuery('SELECT id, title from article LIMIT 100');
        return result.map(i => ({id: i.id, title: i.title} as ArticleDTO));
    }

    postItem(item: ArticleDTO): ArticleDTO {
        throw new Error('Method not implemented.');
    }
    putAll(item: ArticleDTO): ArticleDTO {
        throw new Error('Method not implemented.');
    }
    deleteAll(): void {
        throw new Error('Method not implemented.');
    }
    getItem(id: import('../common/IService').TID): ArticleDTO {
        throw new Error('Method not implemented.');
    }
    putItem(id: import('../common/IService').TID): ArticleDTO {
        throw new Error('Method not implemented.');
    }
    deleteItem(id: import('../common/IService').TID): ArticleDTO {
        throw new Error('Method not implemented.');
    }
}
