import { BaseService } from 'serverSrc/common/BaseService';
import { TID } from 'serverSrc/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, ICityDTO, IGetAllQuery } from '@mapbul-pub/types';

export class CitiesService implements BaseService<ICityDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<ICityDTO>> {
    let filter = '';
    if (query.filter) {
      filter += `WHERE ${query.filter}`;
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

  //postItem(item: ICityDTO): Promise<ICityDTO> {
  //  throw new Error('Method not implemented.');
  //}

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

  //putItem(id: TID): ICityDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): ICityDTO {
  //  throw new Error('Method not implemented.');
  //}
}
