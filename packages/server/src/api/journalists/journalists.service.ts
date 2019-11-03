import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { IJournalistDTO } from './journalist.dto';

export class JournalistsService extends BaseService<IJournalistDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(GlobalVar.env.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IJournalistDTO[]> {
    return await this.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`editorId\`,
        \`firstName\`,
        \`middleName\`,
        \`lastName\`,
        \`gender\`,
        \`phone\`,
        \`birthDate\`,
        \`address\`
      FROM journalist`);
  }

  postItem(item: IJournalistDTO): IJournalistDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IJournalistDTO): IJournalistDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IJournalistDTO> {
    return await this.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`editorId\`,
        \`firstName\`,
        \`middleName\`,
        \`lastName\`,
        \`gender\`,
        \`phone\`,
        \`birthDate\`,
        \`address\`
      FROM journalist
      WHERE id = ${id}`);
  }
  putItem(id: TID): IJournalistDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IJournalistDTO {
    throw new Error('Method not implemented.');
  }
}
