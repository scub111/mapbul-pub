import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';
import { ICategoryDTO } from './category.dto';

export class CategoriesService extends BaseService<ICategoryDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<ICategoryDTO[]> {
    return await this.query(`
      SELECT
        id,
        name,
        enName,
        parentId,
        addedDate,
        icon,
        color,
        pin,
        forArticle
      FROM category`);
  }

  postItem(item: ICategoryDTO): ICategoryDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: ICategoryDTO): ICategoryDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<ICategoryDTO> {
    return await this.query(`
      SELECT
        id,
        name,
        enName,
        parentId,
        addedDate,
        icon,
        color,
        pin,
        forArticle
      FROM category
      WHERE id = ${id}`);
  }
  putItem(id: TID): ICategoryDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): ICategoryDTO {
    throw new Error('Method not implemented.');
  }
}
