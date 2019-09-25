import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';
import { IRegionDTO } from './region.dto';

export class RegionsService extends BaseService<IRegionDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IRegionDTO[]> {
    return await this.query(`
      SELECT
        id,
        countryId,
        name,
        placeId
      FROM region`);
  }

  postItem(item: IRegionDTO): IRegionDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IRegionDTO): IRegionDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IRegionDTO> {
    return await this.query(`
      SELECT
        id,
        countryId,
        name,
        placeId
      FROM region
      WHERE id = ${id}`);
  }
  putItem(id: TID): IRegionDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IRegionDTO {
    throw new Error('Method not implemented.');
  }
}
