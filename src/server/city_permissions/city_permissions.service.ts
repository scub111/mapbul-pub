import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { ICity_permissionDTO } from 'server/city_permissions/city_permission.dto';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';

export class City_permissionsService extends BaseService<ICity_permissionDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<ICity_permissionDTO[]> {
    return await this.query(`
      SELECT
        id,
        cityId,
        userId
      FROM city_permission`);
  }

  postItem(item: ICity_permissionDTO): ICity_permissionDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: ICity_permissionDTO): ICity_permissionDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<ICity_permissionDTO> {
    return await this.query(`
      SELECT
        id,
        cityId,
        userId
      FROM city_permission
      WHERE id = ${id}`);
  }
  putItem(id: TID): ICity_permissionDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): ICity_permissionDTO {
    throw new Error('Method not implemented.');
  }
}
