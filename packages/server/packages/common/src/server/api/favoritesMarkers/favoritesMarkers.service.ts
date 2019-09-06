import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';
import { IFavoritesMarkerDTO } from './favoritesMarker.dto';

export class FavoritesMarkersService extends BaseService<IFavoritesMarkerDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IFavoritesMarkerDTO[]> {
    return await this.query(`
      SELECT
        id,
        userId,
        markerId
      FROM favorites_marker`);
  }

  postItem(item: IFavoritesMarkerDTO): IFavoritesMarkerDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IFavoritesMarkerDTO): IFavoritesMarkerDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IFavoritesMarkerDTO> {
    return await this.query(`
      SELECT
        id,
        userId,
        markerId
      FROM favorites_marker
      WHERE id = ${id}`);
  }
  putItem(id: TID): IFavoritesMarkerDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IFavoritesMarkerDTO {
    throw new Error('Method not implemented.');
  }
}
