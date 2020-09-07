import { IBaseService, TID, IOkPacket } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IFavoritesMarkerDTO, IGetAllQuery } from '@mapbul-pub/types';

export class FavoritesMarkersService implements IBaseService<IFavoritesMarkerDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IFavoritesMarkerDTO>> {
    let filter = '';
    if (query.filter) {
      filter += `WHERE ${query.filter}`;
    }
    if (query.id) {
      if (!Array.isArray(query.id)) filter += `WHERE id in (${query.id})`;
      else filter += `WHERE id in (${query.id.join(',')})`;
    }
    let sort = '';
    if (query.sort) {
      sort += `ORDER BY ${query.sort}`;
    }
    let additional = `${filter} ${sort}`;
    const isPagination = query.page && query.size;
    if (isPagination && query.page && query.size) {
      const offset = (query.page - 1) * query.size;
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM favorites_marker ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`markerId\`
      FROM favorites_marker ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IFavoritesMarkerDTO): Promise<IFavoritesMarkerDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO favorites_marker
      (
        \`userId\`,
        \`markerId\`
      ) 
      Values 
      (
        ${body.userId},
        ${body.markerId}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: IFavoritesMarkerDTO): IFavoritesMarkerDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IFavoritesMarkerDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`markerId\`
      FROM favorites_marker
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IFavoritesMarkerDTO): Promise<IFavoritesMarkerDTO> {
    await this.connection.query(
      `
      UPDATE favorites_marker
      SET
        \`userId\`=${body.userId},
        \`markerId\`=${body.markerId}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IFavoritesMarkerDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM favorites_marker
      WHERE id = ${id}`);
    return record;
  }
}
