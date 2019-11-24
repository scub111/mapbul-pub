import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { Pagination, IFavoritesMarkerDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class FavoritesMarkersService extends BaseService<IFavoritesMarkerDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection({ ...GlobalVar.env.dbConnection, multipleStatements: true });
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(query: GetAllQueryDTO): Promise<Pagination<IFavoritesMarkerDTO>> {
    let additional = '';
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM favorites_marker`;
    }
    const records = await this.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`markerId\`
      FROM favorites_marker ${additional}`);

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  postItem(item: IFavoritesMarkerDTO): Promise<IFavoritesMarkerDTO> {
    throw new Error('Method not implemented.');
  }

  putAll(item: IFavoritesMarkerDTO): IFavoritesMarkerDTO {
    throw new Error('Method not implemented.');
  }

  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  async getItem(id: TID): Promise<IFavoritesMarkerDTO> {
    return (await this.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`markerId\`
      FROM favorites_marker
      WHERE id = ${id}`))[0];
  }

  putItem(id: TID): IFavoritesMarkerDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IFavoritesMarkerDTO {
    throw new Error('Method not implemented.');
  }
}
