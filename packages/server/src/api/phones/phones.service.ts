import { IBaseService, TID, IOkPacket } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IPhoneDTO, IGetAllQuery } from '@mapbul-pub/types';

export class PhonesService implements IBaseService<IPhoneDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IPhoneDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM phone ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`number\`,
        \`markerId\`,
        \`primary\`
      FROM phone ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IPhoneDTO): Promise<IPhoneDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO phone
      (
        \`number\`,
        \`markerId\`,
        \`primary\`
      ) 
      Values 
      (
        '${body.number}',
        ${body.markerId},
        ${body.primary}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: IPhoneDTO): IPhoneDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IPhoneDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`number\`,
        \`markerId\`,
        \`primary\`
      FROM phone
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IPhoneDTO): Promise<IPhoneDTO> {
    await this.connection.query(
      `
      UPDATE phone
      SET
        \`number\`='${body.number}',
        \`markerId\`=${body.markerId},
        \`primary\`=${body.primary}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IPhoneDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM phone
      WHERE id = ${id}`);
    return record;
  }
}
