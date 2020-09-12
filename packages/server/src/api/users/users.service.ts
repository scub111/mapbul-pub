import { IBaseService, TID, IOkPacket } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { dateTimeFormat } from '@mapbul-pub/utils';
import { IDbConnection, PageContent, IUserDTO, IGetAllQuery } from '@mapbul-pub/types';

export class UsersService implements IBaseService<IUserDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IUserDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM user ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`email\`,
        \`guid\`,
        \`userTypeId\`,
        \`registrationDate\`,
        \`deleted\`
      FROM user ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IUserDTO): Promise<IUserDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO user
      (
        \`email\`,
        \`password\`,
        \`guid\`,
        \`userTypeId\`,
        \`registrationDate\`,
        \`deleted\`
      ) 
      Values 
      (
        '${body.email}',
        '${body.password}',
        '${body.guid}',
        ${body.userTypeId},
        '${dateTimeFormat(body.registrationDate)}',
        ${body.deleted}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: IUserDTO): IUserDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IUserDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`email\`,
        \`guid\`,
        \`userTypeId\`,
        \`registrationDate\`,
        \`deleted\`
      FROM user
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IUserDTO): Promise<IUserDTO> {
    await this.connection.query(
      `
      UPDATE user
      SET
        \`email\`='${body.email}',
        \`password\`='${body.password}',
        \`guid\`='${body.guid}',
        \`userTypeId\`=${body.userTypeId},
        \`registrationDate\`='${dateTimeFormat(body.registrationDate)}',
        \`deleted\`=${body.deleted}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IUserDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM user
      WHERE id = ${id}`);
    return record;
  }
}
