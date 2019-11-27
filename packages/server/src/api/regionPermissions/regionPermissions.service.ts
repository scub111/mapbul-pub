import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { PageContent, IRegionPermissionDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class RegionPermissionsService extends BaseService<IRegionPermissionDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection({ ...GlobalVar.env.dbConnection, multipleStatements: true });
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<IRegionPermissionDTO>> {
    let additional = '';
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM region_permission`;
    }
    const records = await this.query(`
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

  postItem(item: IRegionPermissionDTO): Promise<IRegionPermissionDTO> {
    throw new Error('Method not implemented.');
  }

  putAll(item: IRegionPermissionDTO): IRegionPermissionDTO {
    throw new Error('Method not implemented.');
  }

  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  async getItem(id: TID): Promise<IRegionPermissionDTO> {
    return (await this.query(`
      SELECT
        \`id\`,
        \`regionId\`,
        \`userId\`
      FROM region_permission
      WHERE id = ${id}`))[0];
  }

  putItem(id: TID): IRegionPermissionDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IRegionPermissionDTO {
    throw new Error('Method not implemented.');
  }
}
