import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { serverConfig } from 'common/serverConfig';
import { IMarkerDTO } from './marker.dto';

export class MarkersService extends BaseService<IMarkerDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(serverConfig.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IMarkerDTO[]> {
    return await this.query(`
      SELECT
        id,
        name,
        nameEn,
        introduction,
        introductionEn,
        description,
        descriptionEn,
        cityId,
        baseCategoryId,
        lat,
        lng,
        entryTicket,
        discountId,
        street,
        house,
        buliding,
        floor,
        site,
        email,
        photo,
        userId,
        addedDate,
        publishedDate,
        checkDate,
        statusId,
        logo,
        wifi,
        personal
      FROM marker`);
  }

  postItem(item: IMarkerDTO): IMarkerDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IMarkerDTO): IMarkerDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IMarkerDTO> {
    return await this.query(`
      SELECT
        id,
        name,
        nameEn,
        introduction,
        introductionEn,
        description,
        descriptionEn,
        cityId,
        baseCategoryId,
        lat,
        lng,
        entryTicket,
        discountId,
        street,
        house,
        buliding,
        floor,
        site,
        email,
        photo,
        userId,
        addedDate,
        publishedDate,
        checkDate,
        statusId,
        logo,
        wifi,
        personal
      FROM marker
      WHERE id = ${id}`);
  }
  putItem(id: TID): IMarkerDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IMarkerDTO {
    throw new Error('Method not implemented.');
  }
}
