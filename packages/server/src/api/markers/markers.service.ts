import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { Pagination, IMarkerDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class MarkersService extends BaseService<IMarkerDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection({ ...GlobalVar.env.dbConnection, multipleStatements: true });
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(query: GetAllQueryDTO): Promise<Pagination<IMarkerDTO>> {
    let additional = '';
    const isPagenation = query.page && query.limit;
    if (isPagenation) {
      const offset = (query.page - 1) * query.limit;
      additional = `limit ${offset},${query.limit}; SELECT count(*) FROM marker`;
    }
    const records = await this.query(`
      SELECT
        \`id\`,
        \`name\`,
        \`nameEn\`,
        \`introduction\`,
        \`introductionEn\`,
        \`description\`,
        \`descriptionEn\`,
        \`cityId\`,
        \`baseCategoryId\`,
        \`lat\`,
        \`lng\`,
        \`entryTicket\`,
        \`discountId\`,
        \`street\`,
        \`house\`,
        \`buliding\`,
        \`floor\`,
        \`site\`,
        \`email\`,
        \`photo\`,
        \`userId\`,
        \`addedDate\`,
        \`publishedDate\`,
        \`checkDate\`,
        \`statusId\`,
        \`logo\`,
        \`wifi\`,
        \`personal\`
      FROM marker ${additional}`);

    return {
      data: isPagenation ? records[0] : records,
      totalPages: isPagenation ? Number(Math.ceil(records[1][0]['count(*)'] / query.limit)) : 1,
    };
  }

  postItem(item: IMarkerDTO): Promise<IMarkerDTO> {
    throw new Error('Method not implemented.');
  }

  putAll(item: IMarkerDTO): IMarkerDTO {
    throw new Error('Method not implemented.');
  }

  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  async getItem(id: TID): Promise<IMarkerDTO> {
    return (await this.query(`
      SELECT
        \`id\`,
        \`name\`,
        \`nameEn\`,
        \`introduction\`,
        \`introductionEn\`,
        \`description\`,
        \`descriptionEn\`,
        \`cityId\`,
        \`baseCategoryId\`,
        \`lat\`,
        \`lng\`,
        \`entryTicket\`,
        \`discountId\`,
        \`street\`,
        \`house\`,
        \`buliding\`,
        \`floor\`,
        \`site\`,
        \`email\`,
        \`photo\`,
        \`userId\`,
        \`addedDate\`,
        \`publishedDate\`,
        \`checkDate\`,
        \`statusId\`,
        \`logo\`,
        \`wifi\`,
        \`personal\`
      FROM marker
      WHERE id = ${id}`))[0];
  }

  putItem(id: TID): IMarkerDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IMarkerDTO {
    throw new Error('Method not implemented.');
  }
}
