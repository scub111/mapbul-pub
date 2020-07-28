import { BaseService } from 'serverSrc/common/BaseService';
import { TID } from 'serverSrc/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IRegionPermissionDTO, IGetAllQuery } from '@mapbul-pub/types';

export class RegionPermissionsService implements BaseService<IRegionPermissionDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IRegionPermissionDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM region_permission ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`regionId\`,
        \`userId\`
      FROM region_permission ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  //postItem(item: IRegionPermissionDTO): Promise<IRegionPermissionDTO> {
  //  throw new Error('Method not implemented.');
  //}

  //putAll(item: IRegionPermissionDTO): IRegionPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IRegionPermissionDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`regionId\`,
        \`userId\`
      FROM region_permission
      WHERE id = ${id}`)
    )[0];
  }

  //putItem(id: TID): IRegionPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IRegionPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}
}
