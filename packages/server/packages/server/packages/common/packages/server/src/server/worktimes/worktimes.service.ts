import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { IWorktimeDTO } from 'server/worktimes/worktime.dto';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';

export class WorktimesService extends BaseService<IWorktimeDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IWorktimeDTO[]> {
    return await this.query(`
      SELECT
        id,
        openTime,
        closeTime,
        markerId,
        weekDayId
      FROM worktime`);
  }

  postItem(item: IWorktimeDTO): IWorktimeDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IWorktimeDTO): IWorktimeDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IWorktimeDTO> {
    return await this.query(`
      SELECT
        id,
        openTime,
        closeTime,
        markerId,
        weekDayId
      FROM worktime
      WHERE id = ${id}`);
  }
  putItem(id: TID): IWorktimeDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IWorktimeDTO {
    throw new Error('Method not implemented.');
  }
}
