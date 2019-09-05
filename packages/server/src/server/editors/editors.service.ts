import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { IEditorDTO } from 'server/editors/editor.dto';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';

export class EditorsService extends BaseService<IEditorDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IEditorDTO[]> {
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

  postItem(item: IEditorDTO): IEditorDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IEditorDTO): IEditorDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IEditorDTO> {
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
  putItem(id: TID): IEditorDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IEditorDTO {
    throw new Error('Method not implemented.');
  }
}
