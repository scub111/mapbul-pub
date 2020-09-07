import { IBaseService, TID, IOkPacket } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IAdminDTO, IGetAllQuery } from '@mapbul-pub/types';

export class AdminsService implements IBaseService<IAdminDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IAdminDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM admin ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`superuser\`
      FROM admin ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IAdminDTO): Promise<IAdminDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO admin
      (
        \`userId\`,
        \`superuser\`
      ) 
      Values 
      (
        ${body.userId},
        ${body.superuser}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: IAdminDTO): IAdminDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IAdminDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`superuser\`
      FROM admin
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IAdminDTO): Promise<IAdminDTO> {
    await this.connection.query(
      `
      UPDATE admin
      SET
        \`userId\`=${body.userId},
        \`superuser\`=${body.superuser}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IAdminDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM admin
      WHERE id = ${id}`);
    return record;
  }
}
