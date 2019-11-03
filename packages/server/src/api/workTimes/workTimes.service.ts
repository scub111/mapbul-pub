import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { IWorkTimeDTO } from './workTime.dto';

export class WorkTimesService extends BaseService<IWorkTimeDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(GlobalVar.env.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IWorkTimeDTO[]> {
    return await this.query(`
      SELECT
        \`id\`,
        \`openTime\`,
        \`closeTime\`,
        \`markerId\`,
        \`weekDayId\`
      FROM worktime`);
  }

  postItem(item: IWorkTimeDTO): IWorkTimeDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IWorkTimeDTO): IWorkTimeDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IWorkTimeDTO> {
    return await this.query(`
      SELECT
        \`id\`,
        \`openTime\`,
        \`closeTime\`,
        \`markerId\`,
        \`weekDayId\`
      FROM worktime
      WHERE id = ${id}`);
  }
  putItem(id: TID): IWorkTimeDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IWorkTimeDTO {
    throw new Error('Method not implemented.');
  }
}
