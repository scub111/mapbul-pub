import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { IArticlesubcategoryDTO } from 'server/articlesubcategories/articlesubcategory.dto';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';

export class ArticlesubcategoriesService extends BaseService<IArticlesubcategoryDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IArticlesubcategoryDTO[]> {
    return await this.query(`
      SELECT
        id,
        articleId,
        categoryId
      FROM articlesubcategory`);
  }

  postItem(item: IArticlesubcategoryDTO): IArticlesubcategoryDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IArticlesubcategoryDTO): IArticlesubcategoryDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IArticlesubcategoryDTO> {
    return await this.query(`
      SELECT
        id,
        articleId,
        categoryId
      FROM articlesubcategory
      WHERE id = ${id}`);
  }
  putItem(id: TID): IArticlesubcategoryDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IArticlesubcategoryDTO {
    throw new Error('Method not implemented.');
  }
}
