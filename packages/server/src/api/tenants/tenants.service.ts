import { BaseService, TID, IOkPacket } from 'common';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { dateTimeFormat } from '@mapbul-pub/utils';
import { IDbConnection, PageContent, ITenantDTO, IGetAllQuery } from '@mapbul-pub/types';

export class TenantsService implements BaseService<ITenantDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<ITenantDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM tenant ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`firstName\`,
        \`middleName\`,
        \`lastName\`,
        \`gender\`,
        \`phone\`,
        \`birthDate\`,
        \`address\`
      FROM tenant ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: ITenantDTO): Promise<ITenantDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO tenant
      (
        \`userId\`,
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

  //putAll(item: ITenantDTO): ITenantDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<ITenantDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`firstName\`,
        \`middleName\`,
        \`lastName\`,
        \`gender\`,
        \`phone\`,
        \`birthDate\`,
        \`address\`
      FROM tenant
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: ITenantDTO): Promise<ITenantDTO> {
    await this.connection.query(
      `
      UPDATE tenant
      SET
        \`userId\`=${body.userId},
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

  async deleteItem(id: TID): Promise<ITenantDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM tenant
      WHERE id = ${id}`);
    return record;
  }
}
