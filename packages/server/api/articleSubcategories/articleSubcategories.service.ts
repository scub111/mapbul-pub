import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';
import { IArticleSubcategoryDTO } from './articleSubcategory.dto';

export class ArticleSubcategoriesService extends BaseService<IArticleSubcategoryDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IArticleSubcategoryDTO[]> {
    return await this.query(`
      SELECT
        id,
        articleId,
        categoryId
      FROM articlesubcategory`);
  }

  postItem(item: IArticleSubcategoryDTO): IArticleSubcategoryDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IArticleSubcategoryDTO): IArticleSubcategoryDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IArticleSubcategoryDTO> {
    return await this.query(`
      SELECT
        id,
        articleId,
        categoryId
      FROM articlesubcategory
      WHERE id = ${id}`);
  }
  putItem(id: TID): IArticleSubcategoryDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IArticleSubcategoryDTO {
    throw new Error('Method not implemented.');
  }
}
