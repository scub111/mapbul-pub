import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { ICountryDTO } from './country.dto';

export class CountriesService extends BaseService<ICountryDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(GlobalVar.env.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<ICountryDTO[]> {
    return await this.query(`
      SELECT
        \`id\`,
        \`name\`,
        \`enName\`,
        \`placeId\`,
        \`code\`
      FROM country`);
  }

  postItem(item: ICountryDTO): ICountryDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: ICountryDTO): ICountryDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<ICountryDTO> {
    return await this.query(`
      SELECT
        \`id\`,
        \`name\`,
        \`enName\`,
        \`placeId\`,
        \`code\`
      FROM country
      WHERE id = ${id}`);
  }
  putItem(id: TID): ICountryDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): ICountryDTO {
    throw new Error('Method not implemented.');
  }
}
