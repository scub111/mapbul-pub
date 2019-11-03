import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { IWeekDayDTO } from './weekDay.dto';

export class WeekDaysService extends BaseService<IWeekDayDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(GlobalVar.env.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IWeekDayDTO[]> {
    return await this.query(`
      SELECT
        \`id\`,
        \`tag\`,
        \`description\`,
        \`descriptionEn\`
      FROM weekday`);
  }

  postItem(item: IWeekDayDTO): IWeekDayDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IWeekDayDTO): IWeekDayDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IWeekDayDTO> {
    return await this.query(`
      SELECT
        \`id\`,
        \`tag\`,
        \`description\`,
        \`descriptionEn\`
      FROM weekday
      WHERE id = ${id}`);
  }
  putItem(id: TID): IWeekDayDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IWeekDayDTO {
    throw new Error('Method not implemented.');
  }
}
