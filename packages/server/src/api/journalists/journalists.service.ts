import { IBaseService, TID, IOkPacket } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { dateTimeFormat } from '@mapbul-pub/utils';
import { IDbConnection, PageContent, IJournalistDTO, IGetAllQuery } from '@mapbul-pub/types';

export class JournalistsService implements IBaseService<IJournalistDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IJournalistDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM journalist ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`editorId\`,
        \`firstName\`,
        \`middleName\`,
        \`lastName\`,
        \`gender\`,
        \`phone\`,
        \`birthDate\`,
        \`address\`
      FROM journalist ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IJournalistDTO): Promise<IJournalistDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO journalist
      (
        \`userId\`,
        \`editorId\`,
        \`firstName\`,
        \`middleName\`,
        \`lastName\`,
        \`gender\`,
        \`phone\`,
        \`birthDate\`,
        \`address\`
      ) 
      Values 
      (
        ${body.userId},
        ${body.editorId},
        '${body.firstName}',
        '${body.middleName}',
        '${body.lastName}',
        '${body.gender}',
        '${body.phone}',
        '${dateTimeFormat(body.birthDate)}',
        '${body.address}'
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: IJournalistDTO): IJournalistDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IJournalistDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`editorId\`,
        \`firstName\`,
        \`middleName\`,
        \`lastName\`,
        \`gender\`,
        \`phone\`,
        \`birthDate\`,
        \`address\`
      FROM journalist
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IJournalistDTO): Promise<IJournalistDTO> {
    await this.connection.query(
      `
      UPDATE journalist
      SET
        \`userId\`=${body.userId},
        \`editorId\`=${body.editorId},
        \`firstName\`='${body.firstName}',
        \`middleName\`='${body.middleName}',
        \`lastName\`='${body.lastName}',
        \`gender\`='${body.gender}',
        \`phone\`='${body.phone}',
        \`birthDate\`='${dateTimeFormat(body.birthDate)}',
        \`address\`='${body.address}'
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IJournalistDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM journalist
      WHERE id = ${id}`);
    return record;
  }
}
