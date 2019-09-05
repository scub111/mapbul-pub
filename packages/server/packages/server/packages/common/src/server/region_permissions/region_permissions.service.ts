import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { IRegion_permissionDTO } from 'server/region_permissions/region_permission.dto';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';

export class Region_permissionsService extends BaseService<IRegion_permissionDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IRegion_permissionDTO[]> {
    return await this.query(`
      SELECT
        id,
        regionId,
        userId
      FROM region_permission`);
  }

  postItem(item: IRegion_permissionDTO): IRegion_permissionDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IRegion_permissionDTO): IRegion_permissionDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IRegion_permissionDTO> {
    return await this.query(`
      SELECT
        id,
        regionId,
        userId
      FROM region_permission
      WHERE id = ${id}`);
  }
  putItem(id: TID): IRegion_permissionDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IRegion_permissionDTO {
    throw new Error('Method not implemented.');
  }
}
