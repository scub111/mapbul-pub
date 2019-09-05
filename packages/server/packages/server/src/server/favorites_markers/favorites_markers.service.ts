import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { IFavorites_markerDTO } from 'server/favorites_markers/favorites_marker.dto';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';

export class Favorites_markersService extends BaseService<IFavorites_markerDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IFavorites_markerDTO[]> {
    return await this.query(`
      SELECT
        id,
        userId,
        markerId
      FROM favorites_marker`);
  }

  postItem(item: IFavorites_markerDTO): IFavorites_markerDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IFavorites_markerDTO): IFavorites_markerDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IFavorites_markerDTO> {
    return await this.query(`
      SELECT
        id,
        userId,
        markerId
      FROM favorites_marker
      WHERE id = ${id}`);
  }
  putItem(id: TID): IFavorites_markerDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IFavorites_markerDTO {
    throw new Error('Method not implemented.');
  }
}
