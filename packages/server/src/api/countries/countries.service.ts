import { IBaseService, TID, IOkPacket } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, ICountryDTO, IGetAllQuery } from '@mapbul-pub/types';

export class CountriesService implements IBaseService<ICountryDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<ICountryDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM country ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`name\`,
        \`enName\`,
        \`placeId\`,
        \`code\`
      FROM country ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: ICountryDTO): Promise<ICountryDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO country
      (
        \`name\`,
        \`enName\`,
        \`placeId\`,
        \`code\`
      ) 
      Values 
      (
        '${body.name}',
        '${body.enName}',
        '${body.placeId}',
        '${body.code}'
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: ICountryDTO): ICountryDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<ICountryDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`name\`,
        \`enName\`,
        \`placeId\`,
        \`code\`
      FROM country
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: ICountryDTO): Promise<ICountryDTO> {
    await this.connection.query(
      `
      UPDATE country
      SET
        \`name\`='${body.name}',
        \`enName\`='${body.enName}',
        \`placeId\`='${body.placeId}',
        \`code\`='${body.code}'
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<ICountryDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM country
      WHERE id = ${id}`);
    return record;
  }
}
