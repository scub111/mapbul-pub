import { IBaseService, TID, IOkPacket } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, ICityDTO, IGetAllQuery } from '@mapbul-pub/types';

export class CitiesService implements IBaseService<ICityDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<ICityDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM city ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`name\`,
        \`lng\`,
        \`lat\`,
        \`countryId\`,
        \`placeId\`
      FROM city ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: ICityDTO): Promise<ICityDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO city
      (
        \`name\`,
        \`lng\`,
        \`lat\`,
        \`countryId\`,
        \`placeId\`
      ) 
      Values 
      (
        '${body.name}',
        ${body.lng},
        ${body.lat},
        ${body.countryId},
        '${body.placeId}'
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: ICityDTO): ICityDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<ICityDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`name\`,
        \`lng\`,
        \`lat\`,
        \`countryId\`,
        \`placeId\`
      FROM city
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: ICityDTO): Promise<ICityDTO> {
    await this.connection.query(
      `
      UPDATE city
      SET
        \`name\`='${body.name}',
        \`lng\`=${body.lng},
        \`lat\`=${body.lat},
        \`countryId\`=${body.countryId},
        \`placeId\`='${body.placeId}'
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<ICityDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM city
      WHERE id = ${id}`);
    return record;
  }
}
