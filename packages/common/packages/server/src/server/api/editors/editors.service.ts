import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';
import { IEditorsDTO } from './editors.dto';

export class EditorsService extends BaseService<IEditorsDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IEditorsDTO[]> {
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
      FROM editor`);
  }

  postItem(item: IEditorsDTO): IEditorsDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IEditorsDTO): IEditorsDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IEditorsDTO> {
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
      FROM editor
      WHERE id = ${id}`);
  }
  putItem(id: TID): IEditorsDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IEditorsDTO {
    throw new Error('Method not implemented.');
  }
}
