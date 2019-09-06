import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';
import { ICountryPermissionDTO } from './countryPermission.dto';

export class CountryPermissionsService extends BaseService<ICountryPermissionDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<ICountryPermissionDTO[]> {
    return await this.query(`
      SELECT
        id,
        countryId,
        userId
      FROM country_permission`);
  }

  postItem(item: ICountryPermissionDTO): ICountryPermissionDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: ICountryPermissionDTO): ICountryPermissionDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<ICountryPermissionDTO> {
    return await this.query(`
      SELECT
        id,
        countryId,
        userId
      FROM country_permission
      WHERE id = ${id}`);
  }
  putItem(id: TID): ICountryPermissionDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): ICountryPermissionDTO {
    throw new Error('Method not implemented.');
  }
}
