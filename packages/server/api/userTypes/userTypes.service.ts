import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';
import { IUserTypeDTO } from './userType.dto';

export class UserTypesService extends BaseService<IUserTypeDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IUserTypeDTO[]> {
    return await this.query(`
      SELECT
        id,
        tag,
        description
      FROM usertype`);
  }

  postItem(item: IUserTypeDTO): IUserTypeDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IUserTypeDTO): IUserTypeDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IUserTypeDTO> {
    return await this.query(`
      SELECT
        id,
        tag,
        description
      FROM usertype
      WHERE id = ${id}`);
  }
  putItem(id: TID): IUserTypeDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IUserTypeDTO {
    throw new Error('Method not implemented.');
  }
}
