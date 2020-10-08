import { IBaseService, TID, IOkPacket } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IRegionDTO, IGetAllQuery } from '@mapbul-pub/types';

export class RegionsService implements IBaseService<IRegionDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IRegionDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM region ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`countryId\`,
        \`name\`,
        \`placeId\`
      FROM region ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IRegionDTO): Promise<IRegionDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO region
      (
        \`countryId\`,
        \`name\`,
        \`placeId\`
      ) 
      Values 
      (
        ${body.countryId},
        '${body.name}',
        ${body.placeId ? `'${body.placeId}'` : 'NULL'}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: IRegionDTO): IRegionDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IRegionDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`countryId\`,
        \`name\`,
        \`placeId\`
      FROM region
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IRegionDTO): Promise<IRegionDTO> {
    await this.connection.query(
      `
      UPDATE region
      SET
        \`countryId\`=${body.countryId},
        \`name\`='${body.name}',
        \`placeId\`=${body.placeId ? `'${body.placeId}'` : 'NULL'}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IRegionDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM region
      WHERE id = ${id}`);
    return record;
  }
}
