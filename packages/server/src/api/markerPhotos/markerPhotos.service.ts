import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { Pagination, IMarkerPhotosDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class MarkerPhotosService extends BaseService<IMarkerPhotosDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection({ ...GlobalVar.env.dbConnection, multipleStatements: true });
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(query: GetAllQueryDTO): Promise<Pagination<IMarkerPhotosDTO>> {
    let additional = '';
    const isPagenation = query.page && query.size;
    if (isPagenation) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM marker_photos`;
    }
    const records = await this.query(`
      SELECT
        \`id\`,
        \`markerId\`,
        \`photo\`,
        \`photoMini\`
      FROM marker_photos ${additional}`);

    return {
      data: isPagenation ? records[0] : records,
      totalPages: isPagenation ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  postItem(item: IMarkerPhotosDTO): Promise<IMarkerPhotosDTO> {
    throw new Error('Method not implemented.');
  }

  putAll(item: IMarkerPhotosDTO): IMarkerPhotosDTO {
    throw new Error('Method not implemented.');
  }

  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  async getItem(id: TID): Promise<IMarkerPhotosDTO> {
    return (await this.query(`
      SELECT
        \`id\`,
        \`markerId\`,
        \`photo\`,
        \`photoMini\`
      FROM marker_photos
      WHERE id = ${id}`))[0];
  }

  putItem(id: TID): IMarkerPhotosDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IMarkerPhotosDTO {
    throw new Error('Method not implemented.');
  }
}
