import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';
import { ICityPermissionDTO } from './cityPermission.dto';

export class CityPermissionsService extends BaseService<ICityPermissionDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<ICityPermissionDTO[]> {
    return await this.query(`
      SELECT
        id,
        cityId,
        userId
      FROM city_permission`);
  }

  postItem(item: ICityPermissionDTO): ICityPermissionDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: ICityPermissionDTO): ICityPermissionDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<ICityPermissionDTO> {
    return await this.query(`
      SELECT
        id,
        cityId,
        userId
      FROM city_permission
      WHERE id = ${id}`);
  }
  putItem(id: TID): ICityPermissionDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): ICityPermissionDTO {
    throw new Error('Method not implemented.');
  }
}
