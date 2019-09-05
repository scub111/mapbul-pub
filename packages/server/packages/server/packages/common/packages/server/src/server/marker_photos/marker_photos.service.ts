import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { IMarker_photosDTO } from 'server/marker_photos/marker_photos.dto';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';

export class Marker_photosService extends BaseService<IMarker_photosDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IMarker_photosDTO[]> {
    return await this.query(`
      SELECT
        id,
        markerId,
        photo,
        photoMini
      FROM marker_photos`);
  }

  postItem(item: IMarker_photosDTO): IMarker_photosDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IMarker_photosDTO): IMarker_photosDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IMarker_photosDTO> {
    return await this.query(`
      SELECT
        id,
        markerId,
        photo,
        photoMini
      FROM marker_photos
      WHERE id = ${id}`);
  }
  putItem(id: TID): IMarker_photosDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IMarker_photosDTO {
    throw new Error('Method not implemented.');
  }
}
