import { IBaseService, TID, IOkPacket } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import {
  IDbConnection,
  PageContent,
  IArticleSubcategoryDTO,
  IGetAllQuery,
} from '@mapbul-pub/types';

export class ArticleSubcategoriesService implements IBaseService<IArticleSubcategoryDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IArticleSubcategoryDTO>> {
    let filter = '';
    if (query.filter) {
      filter += `WHERE ${query.filter}`;
    }
    if (query.id) {
      if (!Array.isArray(query.id)) filter += `WHERE id in (${query.id})`;
      else filter += `WHERE id in (${query.id.join(',')})`;
    }
    let sort = '';
    if (query.sort) {
      sort += `ORDER BY ${query.sort}`;
    }
    let additional = `${filter} ${sort}`;
    const isPagination = query.page && query.size;
    if (isPagination && query.page && query.size) {
      const offset = (query.page - 1) * query.size;
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM articlesubcategory ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`articleId\`,
        \`categoryId\`
      FROM articlesubcategory ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IArticleSubcategoryDTO): Promise<IArticleSubcategoryDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO articlesubcategory
      (
        \`articleId\`,
        \`categoryId\`
      ) 
      Values 
      (
        ${body.articleId},
        ${body.categoryId}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: IArticleSubcategoryDTO): IArticleSubcategoryDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IArticleSubcategoryDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`articleId\`,
        \`categoryId\`
      FROM articlesubcategory
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IArticleSubcategoryDTO): Promise<IArticleSubcategoryDTO> {
    await this.connection.query(
      `
      UPDATE articlesubcategory
      SET
        \`articleId\`=${body.articleId},
        \`categoryId\`=${body.categoryId}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IArticleSubcategoryDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM articlesubcategory
      WHERE id = ${id}`);
    return record;
  }
}
