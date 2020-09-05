import { BaseService, TID, IOkPacket } from 'common';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, ISubcategoryDTO, IGetAllQuery } from '@mapbul-pub/types';

export class SubcategoriesService implements BaseService<ISubcategoryDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<ISubcategoryDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM subcategory ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`markerId\`,
        \`categoryId\`
      FROM subcategory ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: ISubcategoryDTO): Promise<ISubcategoryDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO subcategory
      (
        \`markerId\`,
        \`categoryId\`
      ) 
      Values 
      (
        ${body.markerId},
        ${body.categoryId}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: ISubcategoryDTO): ISubcategoryDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<ISubcategoryDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`markerId\`,
        \`categoryId\`
      FROM subcategory
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: ISubcategoryDTO): Promise<ISubcategoryDTO> {
    await this.connection.query(
      `
      UPDATE subcategory
      SET
        \`markerId\`=${body.markerId},
        \`categoryId\`=${body.categoryId}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<ISubcategoryDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM subcategory
      WHERE id = ${id}`);
    return record;
  }
}
