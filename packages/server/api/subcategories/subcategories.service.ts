import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';
import { ISubcategoryDTO } from './subcategory.dto';

export class SubcategoriesService extends BaseService<ISubcategoryDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<ISubcategoryDTO[]> {
    return await this.query(`
      SELECT
        id,
        markerId,
        categoryId
      FROM subcategory`);
  }

  postItem(item: ISubcategoryDTO): ISubcategoryDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: ISubcategoryDTO): ISubcategoryDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<ISubcategoryDTO> {
    return await this.query(`
      SELECT
        id,
        markerId,
        categoryId
      FROM subcategory
      WHERE id = ${id}`);
  }
  putItem(id: TID): ISubcategoryDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): ISubcategoryDTO {
    throw new Error('Method not implemented.');
  }
}
