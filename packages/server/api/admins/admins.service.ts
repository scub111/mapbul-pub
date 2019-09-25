import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';
import { IAdminDTO } from './admin.dto';

export class AdminsService extends BaseService<IAdminDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IAdminDTO[]> {
    return await this.query(`
      SELECT
        id,
        userId,
        superuser
      FROM admin`);
  }

  postItem(item: IAdminDTO): IAdminDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IAdminDTO): IAdminDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IAdminDTO> {
    return await this.query(`
      SELECT
        id,
        userId,
        superuser
      FROM admin
      WHERE id = ${id}`);
  }
  putItem(id: TID): IAdminDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IAdminDTO {
    throw new Error('Method not implemented.');
  }
}
