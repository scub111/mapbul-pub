import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { Pagination, ICategoryDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class CategoriesService extends BaseService<ICategoryDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection({ ...GlobalVar.env.dbConnection, multipleStatements: true });
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(query: GetAllQueryDTO): Promise<Pagination<ICategoryDTO>> {
    let additional = '',
    const isPagenation = query.page && query.limit;
    if (isPagenation) {
      const offset = (query.page - 1) * query.limit;
      additional = `limit ${offset},${query.limit}; SELECT count(*) FROM category`;
    }
    const records = await this.query(`
      SELECT
        \`id\`,
        \`name\`,
        \`enName\`,
        \`parentId\`,
        \`addedDate\`,
        \`icon\`,
        \`color\`,
        \`pin\`,
        \`forArticle\`
      FROM category ${additional}`);

    return {
      data: isPagenation ? records[0] : records,
      totalPages: isPagenation ? Number(Math.ceil(records[1][0]['count(*)'] / query.limit)) : 1,
    };
  }

  postItem(item: ICategoryDTO): Promise<ICategoryDTO> {
    throw new Error('Method not implemented.');
  }

  putAll(item: ICategoryDTO): ICategoryDTO {
    throw new Error('Method not implemented.');
  }

  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  async getItem(id: TID): Promise<ICategoryDTO> {
    return (await this.query(`
      SELECT
        \`id\`,
        \`name\`,
        \`enName\`,
        \`parentId\`,
        \`addedDate\`,
        \`icon\`,
        \`color\`,
        \`pin\`,
        \`forArticle\`
      FROM category
      WHERE id = ${id}`))[0];
  }

  putItem(id: TID): ICategoryDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): ICategoryDTO {
    throw new Error('Method not implemented.');
  }
}
