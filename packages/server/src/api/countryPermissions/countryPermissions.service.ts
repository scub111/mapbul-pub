import { IBaseService, TID, IOkPacket } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, ICountryPermissionDTO, IGetAllQuery } from '@mapbul-pub/types';

export class CountryPermissionsService implements IBaseService<ICountryPermissionDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<ICountryPermissionDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM country_permission ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`countryId\`,
        \`userId\`
      FROM country_permission ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: ICountryPermissionDTO): Promise<ICountryPermissionDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO country_permission
      (
        \`countryId\`,
        \`userId\`
      ) 
      Values 
      (
        ${body.countryId},
        ${body.userId}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: ICountryPermissionDTO): ICountryPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<ICountryPermissionDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`countryId\`,
        \`userId\`
      FROM country_permission
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: ICountryPermissionDTO): Promise<ICountryPermissionDTO> {
    await this.connection.query(
      `
      UPDATE country_permission
      SET
        \`countryId\`=${body.countryId},
        \`userId\`=${body.userId}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<ICountryPermissionDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM country_permission
      WHERE id = ${id}`);
    return record;
  }
}
