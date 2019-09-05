import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { IFavorites_articleDTO } from 'server/favorites_articles/favorites_article.dto';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';

export class Favorites_articlesService extends BaseService<IFavorites_articleDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IFavorites_articleDTO[]> {
    return await this.query(`
      SELECT
        id,
        userId,
        articleId
      FROM favorites_article`);
  }

  postItem(item: IFavorites_articleDTO): IFavorites_articleDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IFavorites_articleDTO): IFavorites_articleDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IFavorites_articleDTO> {
    return await this.query(`
      SELECT
        id,
        userId,
        articleId
      FROM favorites_article
      WHERE id = ${id}`);
  }
  putItem(id: TID): IFavorites_articleDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IFavorites_articleDTO {
    throw new Error('Method not implemented.');
  }
}
