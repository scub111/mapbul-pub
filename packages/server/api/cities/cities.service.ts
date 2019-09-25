import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';
import { ICityDTO } from './city.dto';

export class CitiesService extends BaseService<ICityDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<ICityDTO[]> {
    return await this.query(`
      SELECT
        id,
        name,
        lng,
        lat,
        countryId,
        placeId
      FROM city`);
  }

  postItem(item: ICityDTO): ICityDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: ICityDTO): ICityDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<ICityDTO> {
    return await this.query(`
      SELECT
        id,
        name,
        lng,
        lat,
        countryId,
        placeId
      FROM city
      WHERE id = ${id}`);
  }
  putItem(id: TID): ICityDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): ICityDTO {
    throw new Error('Method not implemented.');
  }
}
