import { BaseService, TID, IOkPacket } from 'common';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, ICityPermissionDTO, IGetAllQuery } from '@mapbul-pub/types';

export class CityPermissionsService implements BaseService<ICityPermissionDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<ICityPermissionDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM city_permission ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`cityId\`,
        \`userId\`
      FROM city_permission ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: ICityPermissionDTO): Promise<ICityPermissionDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO city_permission
      (
        \`cityId\`,
        \`userId\`
      ) 
      Values 
      (
        ${body.cityId},
        ${body.userId}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: ICityPermissionDTO): ICityPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<ICityPermissionDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`cityId\`,
        \`userId\`
      FROM city_permission
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: ICityPermissionDTO): Promise<ICityPermissionDTO> {
    await this.connection.query(
      `
      UPDATE city_permission
      SET
        \`cityId\`=${body.cityId},
        \`userId\`=${body.userId}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<ICityPermissionDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM city_permission
      WHERE id = ${id}`);
    return record;
  }
}
