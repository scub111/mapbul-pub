import { BaseService } from 'serverSrc/common/BaseService';
import { TID } from 'serverSrc/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, ICountryDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'serverSrc/common/QueryDTO';

export class CountriesService implements BaseService<ICountryDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<ICountryDTO>> {
    let additional = '';
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM country`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`name\`,
        \`enName\`,
        \`placeId\`,
        \`code\`
      FROM country ${additional}`);

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  //postItem(item: ICountryDTO): Promise<ICountryDTO> {
  //  throw new Error('Method not implemented.');
  //}

  //putAll(item: ICountryDTO): ICountryDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<ICountryDTO> {
    return (await this.connection.query(`
      SELECT
        \`id\`,
        \`name\`,
        \`enName\`,
        \`placeId\`,
        \`code\`
      FROM country
      WHERE id = ${id}`))[0];
  }

  //putItem(id: TID): ICountryDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): ICountryDTO {
  //  throw new Error('Method not implemented.');
  //}
}
