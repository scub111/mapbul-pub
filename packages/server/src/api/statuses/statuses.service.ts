import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { IStatusDTO } from './status.dto';

export class StatusesService extends BaseService<IStatusDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(GlobalVar.env.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IStatusDTO[]> {
    return await this.query(`
      SELECT
        \`id\`,
        \`tag\`,
        \`description\`
      FROM status`);
  }

  postItem(item: IStatusDTO): IStatusDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IStatusDTO): IStatusDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IStatusDTO> {
    return await this.query(`
      SELECT
        \`id\`,
        \`tag\`,
        \`description\`
      FROM status
      WHERE id = ${id}`);
  }
  putItem(id: TID): IStatusDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IStatusDTO {
    throw new Error('Method not implemented.');
  }
}
