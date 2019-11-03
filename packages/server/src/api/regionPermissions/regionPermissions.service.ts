import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { IRegionPermissionDTO } from './regionPermission.dto';

export class RegionPermissionsService extends BaseService<IRegionPermissionDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(GlobalVar.env.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IRegionPermissionDTO[]> {
    return await this.query(`
      SELECT
        \`id\`,
        \`regionId\`,
        \`userId\`
      FROM region_permission`);
  }

  postItem(item: IRegionPermissionDTO): IRegionPermissionDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IRegionPermissionDTO): IRegionPermissionDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IRegionPermissionDTO> {
    return await this.query(`
      SELECT
        \`id\`,
        \`regionId\`,
        \`userId\`
      FROM region_permission
      WHERE id = ${id}`);
  }
  putItem(id: TID): IRegionPermissionDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IRegionPermissionDTO {
    throw new Error('Method not implemented.');
  }
}
