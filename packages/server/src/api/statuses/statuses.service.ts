import { IBaseService, TID, IOkPacket } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IStatusDTO, IGetAllQuery } from '@mapbul-pub/types';

export class StatusesService implements IBaseService<IStatusDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IStatusDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM status ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`tag\`,
        \`description\`
      FROM status ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IStatusDTO): Promise<IStatusDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO status
      (
        \`tag\`,
        \`description\`
      ) 
      Values 
      (
        '${body.tag}',
        '${body.description}'
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: IStatusDTO): IStatusDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IStatusDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`tag\`,
        \`description\`
      FROM status
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IStatusDTO): Promise<IStatusDTO> {
    await this.connection.query(
      `
      UPDATE status
      SET
        \`tag\`='${body.tag}',
        \`description\`='${body.description}'
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IStatusDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM status
      WHERE id = ${id}`);
    return record;
  }
}
