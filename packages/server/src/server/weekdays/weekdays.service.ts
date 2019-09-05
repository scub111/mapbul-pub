import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { IWeekdayDTO } from 'server/weekdays/weekday.dto';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';

export class WeekdaysService extends BaseService<IWeekdayDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IWeekdayDTO[]> {
    return await this.query(`
      SELECT
        id,
        tag,
        description,
        descriptionEn
      FROM weekday`);
  }

  postItem(item: IWeekdayDTO): IWeekdayDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IWeekdayDTO): IWeekdayDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IWeekdayDTO> {
    return await this.query(`
      SELECT
        id,
        tag,
        description,
        descriptionEn
      FROM weekday
      WHERE id = ${id}`);
  }
  putItem(id: TID): IWeekdayDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IWeekdayDTO {
    throw new Error('Method not implemented.');
  }
}
