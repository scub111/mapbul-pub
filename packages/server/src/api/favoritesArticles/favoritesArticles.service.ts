import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { IFavoritesArticleDTO } from './favoritesArticle.dto';

export class FavoritesArticlesService extends BaseService<IFavoritesArticleDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(GlobalVar.env.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IFavoritesArticleDTO[]> {
    return await this.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`articleId\`
      FROM favorites_article`);
  }

  postItem(item: IFavoritesArticleDTO): IFavoritesArticleDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IFavoritesArticleDTO): IFavoritesArticleDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IFavoritesArticleDTO> {
    return await this.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`articleId\`
      FROM favorites_article
      WHERE id = ${id}`);
  }
  putItem(id: TID): IFavoritesArticleDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IFavoritesArticleDTO {
    throw new Error('Method not implemented.');
  }
}
