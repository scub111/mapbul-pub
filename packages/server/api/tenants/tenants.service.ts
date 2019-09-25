import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';
import { ITenantDTO } from './tenant.dto';

export class TenantsService extends BaseService<ITenantDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<ITenantDTO[]> {
    return await this.query(`
      SELECT
        id,
        userId,
        firstName,
        middleName,
        lastName,
        gender,
        phone,
        birthDate,
        address
      FROM tenant`);
  }

  postItem(item: ITenantDTO): ITenantDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: ITenantDTO): ITenantDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<ITenantDTO> {
    return await this.query(`
      SELECT
        id,
        userId,
        firstName,
        middleName,
        lastName,
        gender,
        phone,
        birthDate,
        address
      FROM tenant
      WHERE id = ${id}`);
  }
  putItem(id: TID): ITenantDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): ITenantDTO {
    throw new Error('Method not implemented.');
  }
}
