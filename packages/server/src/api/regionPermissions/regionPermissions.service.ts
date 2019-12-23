import { BaseService } from 'serverSrc/common/BaseService';
import { TID } from 'serverSrc/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IRegionPermissionDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'serverSrc/common/QueryDTO';

export class RegionPermissionsService implements BaseService<IRegionPermissionDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<IRegionPermissionDTO>> {
    let filter = '';
    if ('filter' in query) {
      filter += `WHERE ${query['filter']}`;
    }
    let additional = filter;
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM region_permission ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`regionId\`,
        \`userId\`
      FROM region_permission ${additional}`);

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
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
    return (await this.connection.query(`
      SELECT
        \`id\`,
        \`regionId\`,
        \`userId\`
      FROM region_permission
      WHERE id = ${id}`))[0];
  }

  //putItem(id: TID): IRegionPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IRegionPermissionDTO {
  //  throw new Error('Method not implemented.');
  //}
}
