import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';
import { IPhoneDTO } from './phone.dto';

export class PhonesService extends BaseService<IPhoneDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IPhoneDTO[]> {
    return await this.query(`
      SELECT
        id,
        number,
        markerId,
        primary
      FROM phone`);
  }

  postItem(item: IPhoneDTO): IPhoneDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IPhoneDTO): IPhoneDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IPhoneDTO> {
    return await this.query(`
      SELECT
        id,
        number,
        markerId,
        primary
      FROM phone
      WHERE id = ${id}`);
  }
  putItem(id: TID): IPhoneDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IPhoneDTO {
    throw new Error('Method not implemented.');
  }
}
