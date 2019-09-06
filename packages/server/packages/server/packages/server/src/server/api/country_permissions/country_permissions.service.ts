import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { ICountry_permissionDTO } from 'server/api/country_permissions/country_permission.dto';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';

export class Country_permissionsService extends BaseService<ICountry_permissionDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<ICountry_permissionDTO[]> {
    return await this.query(`
      SELECT
        id,
        countryId,
        userId
      FROM country_permission`);
  }

  postItem(item: ICountry_permissionDTO): ICountry_permissionDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: ICountry_permissionDTO): ICountry_permissionDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<ICountry_permissionDTO> {
    return await this.query(`
      SELECT
        id,
        countryId,
        userId
      FROM country_permission
      WHERE id = ${id}`);
  }
  putItem(id: TID): ICountry_permissionDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): ICountry_permissionDTO {
    throw new Error('Method not implemented.');
  }
}
