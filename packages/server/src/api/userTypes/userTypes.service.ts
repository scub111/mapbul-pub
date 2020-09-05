import { BaseService, TID, IOkPacket } from 'common';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IUserTypeDTO, IGetAllQuery } from '@mapbul-pub/types';

export class UserTypesService implements BaseService<IUserTypeDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IUserTypeDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM usertype ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`tag\`,
        \`description\`
      FROM usertype ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IUserTypeDTO): Promise<IUserTypeDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO usertype
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

  //putAll(item: IUserTypeDTO): IUserTypeDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IUserTypeDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`tag\`,
        \`description\`
      FROM usertype
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IUserTypeDTO): Promise<IUserTypeDTO> {
    await this.connection.query(
      `
      UPDATE usertype
      SET
        \`tag\`='${body.tag}',
        \`description\`='${body.description}'
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IUserTypeDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM usertype
      WHERE id = ${id}`);
    return record;
  }
}
