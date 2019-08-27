import * as mysql from 'mysql';
import * as util from 'util';
import { Injectable } from '@nestjs/common';
import { IApi } from 'src/common/IApi';
import { ArticleDTO } from './dto/article.dto';
import { Connection } from 'mysql';
import { createConnection } from 'typeorm';
// import { Arcicle } from 'src/entities/article';

@Injectable()
export class ArticlesService implements IApi<ArticleDTO> {
    constructor() {
        this.mysqlConnection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '461301+MY',
            database: 'mapbul',
        });
        this.mysqlQuery = util.promisify(this.mysqlConnection.query).bind(this.mysqlConnection);
        // createConnection().then(connection => {
        //     this.articleRepository = connection.getRepository(Arcicle);
        // });
    }
    mysqlConnection: Connection;
    mysqlQuery: any;
    articleRepository;
    async getAll(): Promise<ArticleDTO[]> {
        // return await this.mysqlQuery('select id, Title from article limit 100;');
        return await this.mysqlQuery('SELECT `Article`.`id` AS `Article_id`, `Article`.`title` AS `Article_title` FROM `article` `Article` LIMIT 100');
        // return null;
        // return await this.articleRepository.find();
    }

    async test() {
        // const connection = await createConnection({
        //     // name: 'connection1',
        //     type: 'mysql',
        //     host: 'localhost',
        //     port: 3306,
        //     username: 'root',
        //     password: '461301+MY',
        //     database: 'mapbul',
        //     // entities: ['src/entities/*.ts'],
        //     // logging: true,
        //     synchronize: true,
        //   });
        // // await connection.connect();
        // this.articleRepository = connection.getRepository(Arcicle);
        // await this.articleRepository.find();
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
    getItem(id: import('../common/IApi').TID): ArticleDTO {
        throw new Error('Method not implemented.');
    }
    putItem(id: import('../common/IApi').TID): ArticleDTO {
        throw new Error('Method not implemented.');
    }
    deleteItem(id: import('../common/IApi').TID): ArticleDTO {
        throw new Error('Method not implemented.');
    }
}
