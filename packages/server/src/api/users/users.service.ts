import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { IUserDTO } from './user.dto';

export class UsersService extends BaseService<IUserDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(GlobalVar.env.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IUserDTO[]> {
    return await this.query(`
      SELECT
        \`id\`,
        \`email\`,
        \`password\`,
        \`guid\`,
        \`userTypeId\`,
        \`registrationDate\`,
        \`deleted\`
      FROM user`);
  }

  postItem(item: IUserDTO): IUserDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IUserDTO): IUserDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IUserDTO> {
    return await this.query(`
      SELECT
        \`id\`,
        \`email\`,
        \`password\`,
        \`guid\`,
        \`userTypeId\`,
        \`registrationDate\`,
        \`deleted\`
      FROM user
      WHERE id = ${id}`);
  }
  putItem(id: TID): IUserDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IUserDTO {
    throw new Error('Method not implemented.');
  }
}
