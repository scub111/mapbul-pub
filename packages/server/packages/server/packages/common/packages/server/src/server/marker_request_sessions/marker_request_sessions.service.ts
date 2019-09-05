import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { IMarker_request_sessionDTO } from 'server/marker_request_sessions/marker_request_session.dto';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';

export class Marker_request_sessionsService extends BaseService<IMarker_request_sessionDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IMarker_request_sessionDTO[]> {
    return await this.query(`
      SELECT
        id,
        sessionId,
        markerId
      FROM marker_request_session`);
  }

  postItem(item: IMarker_request_sessionDTO): IMarker_request_sessionDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IMarker_request_sessionDTO): IMarker_request_sessionDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IMarker_request_sessionDTO> {
    return await this.query(`
      SELECT
        id,
        sessionId,
        markerId
      FROM marker_request_session
      WHERE id = ${id}`);
  }
  putItem(id: TID): IMarker_request_sessionDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IMarker_request_sessionDTO {
    throw new Error('Method not implemented.');
  }
}
