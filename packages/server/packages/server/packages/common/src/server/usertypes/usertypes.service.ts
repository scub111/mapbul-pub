import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { IUsertypeDTO } from 'server/usertypes/usertype.dto';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';

export class UsertypesService extends BaseService<IUsertypeDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IUsertypeDTO[]> {
    return await this.query(`
      SELECT
        id,
        tag,
        description
      FROM usertype`);
  }

  postItem(item: IUsertypeDTO): IUsertypeDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IUsertypeDTO): IUsertypeDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IUsertypeDTO> {
    return await this.query(`
      SELECT
        id,
        tag,
        description
      FROM usertype
      WHERE id = ${id}`);
  }
  putItem(id: TID): IUsertypeDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IUsertypeDTO {
    throw new Error('Method not implemented.');
  }
}
