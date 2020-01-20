import { BaseService } from 'serverSrc/common/BaseService';
import { TID } from 'serverSrc/common/types';
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

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / (query?.size || 1))) : 1,
    };
  }

  //postItem(item: ICityPermissionDTO): Promise<ICityPermissionDTO> {
  //  throw new Error('Method not implemented.');
  //}

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

  //putItem(id: TID): ICityPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): ICityPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}
}
