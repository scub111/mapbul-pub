import { BaseService } from 'server/common/BaseService';
import { TID } from 'server/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, ICategoryDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class CategoriesService implements BaseService<ICategoryDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<ICategoryDTO>> {
    let additional = '';
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM category`;
    }
    const records = await this.connection.query(`
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
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  //postItem(item: ICategoryDTO): Promise<ICategoryDTO> {
  //  throw new Error('Method not implemented.');
  //}

  //putAll(item: ICategoryDTO): ICategoryDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<ICategoryDTO> {
    return (await this.connection.query(`
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

  //putItem(id: TID): ICategoryDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): ICategoryDTO {
  //  throw new Error('Method not implemented.');
  //}
}
