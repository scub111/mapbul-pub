import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { IGuideDTO } from './guide.dto';

export class GuidesService extends BaseService<IGuideDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(GlobalVar.env.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IGuideDTO[]> {
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
      FROM guide`);
  }

  postItem(item: IGuideDTO): IGuideDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IGuideDTO): IGuideDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IGuideDTO> {
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
      FROM guide
      WHERE id = ${id}`);
  }
  putItem(id: TID): IGuideDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IGuideDTO {
    throw new Error('Method not implemented.');
  }
}
