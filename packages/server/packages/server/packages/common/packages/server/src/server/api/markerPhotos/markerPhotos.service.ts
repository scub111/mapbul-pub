import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';
import { IMarkerPhotosDTO } from './markerPhotos.dto';

export class MarkerPhotosService extends BaseService<IMarkerPhotosDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IMarkerPhotosDTO[]> {
    return await this.query(`
      SELECT
        id,
        markerId,
        photo,
        photoMini
      FROM marker_photos`);
  }

  postItem(item: IMarkerPhotosDTO): IMarkerPhotosDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IMarkerPhotosDTO): IMarkerPhotosDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IMarkerPhotosDTO> {
    return await this.query(`
      SELECT
        id,
        markerId,
        photo,
        photoMini
      FROM marker_photos
      WHERE id = ${id}`);
  }
  putItem(id: TID): IMarkerPhotosDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IMarkerPhotosDTO {
    throw new Error('Method not implemented.');
  }
}
