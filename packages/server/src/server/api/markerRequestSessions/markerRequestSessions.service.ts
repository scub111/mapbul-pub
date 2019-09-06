import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';
import { IMarkerRequestSessionDTO } from './markerRequestSession.dto';

export class MarkerRequestSessionsService extends BaseService<IMarkerRequestSessionDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IMarkerRequestSessionDTO[]> {
    return await this.query(`
      SELECT
        id,
        sessionId,
        markerId
      FROM marker_request_session`);
  }

  postItem(item: IMarkerRequestSessionDTO): IMarkerRequestSessionDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IMarkerRequestSessionDTO): IMarkerRequestSessionDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IMarkerRequestSessionDTO> {
    return await this.query(`
      SELECT
        id,
        sessionId,
        markerId
      FROM marker_request_session
      WHERE id = ${id}`);
  }
  putItem(id: TID): IMarkerRequestSessionDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IMarkerRequestSessionDTO {
    throw new Error('Method not implemented.');
  }
}
