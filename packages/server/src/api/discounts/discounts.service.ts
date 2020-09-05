import { BaseService, TID, IOkPacket } from 'common';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IDiscountDTO, IGetAllQuery } from '@mapbul-pub/types';

export class DiscountsService implements BaseService<IDiscountDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IDiscountDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM discount ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`value\`
      FROM discount ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IDiscountDTO): Promise<IDiscountDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO discount
      (
        \`value\`
      ) 
      Values 
      (
        ${body.value}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: IDiscountDTO): IDiscountDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IDiscountDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`value\`
      FROM discount
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IDiscountDTO): Promise<IDiscountDTO> {
    await this.connection.query(
      `
      UPDATE discount
      SET
        \`value\`=${body.value}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IDiscountDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM discount
      WHERE id = ${id}`);
    return record;
  }
}
