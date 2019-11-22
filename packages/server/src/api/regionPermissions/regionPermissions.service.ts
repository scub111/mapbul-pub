import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { Pagination, IRegionPermissionDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class RegionPermissionsService extends BaseService<IRegionPermissionDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection({ ...GlobalVar.env.dbConnection, multipleStatements: true });
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(query: GetAllQueryDTO): Promise<Pagination<IRegionPermissionDTO>> {
    let additional = '',
    const isPagenation = query.page && query.limit;
    if (isPagenation) {
      const offset = (query.page - 1) * query.limit;
      additional = `limit ${offset},${query.limit}; SELECT count(*) FROM region_permission`;
    }
    const records = await this.query(`
      SELECT
        \`id\`,
        \`regionId\`,
        \`userId\`
      FROM region_permission ${additional}`);

    return {
      data: isPagenation ? records[0] : records,
      totalPages: isPagenation ? Number(Math.ceil(records[1][0]['count(*)'] / query.limit)) : 1,
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
