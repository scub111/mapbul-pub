import { IBaseService, TID, IOkPacket } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IMarkerPhotosDTO, IGetAllQuery } from '@mapbul-pub/types';

export class MarkerPhotosService implements IBaseService<IMarkerPhotosDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IMarkerPhotosDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM marker_photos ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`markerId\`,
        \`photo\`,
        \`photoMini\`
      FROM marker_photos ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IMarkerPhotosDTO): Promise<IMarkerPhotosDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO marker_photos
      (
        \`markerId\`,
        \`photo\`,
        \`photoMini\`
      ) 
      Values 
      (
        ${body.markerId},
        ${body.photo ? `'${body.photo}'` : 'NULL'},
        ${body.photoMini ? `'${body.photoMini}'` : 'NULL'}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: IMarkerPhotosDTO): IMarkerPhotosDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IMarkerPhotosDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`markerId\`,
        \`photo\`,
        \`photoMini\`
      FROM marker_photos
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IMarkerPhotosDTO): Promise<IMarkerPhotosDTO> {
    await this.connection.query(
      `
      UPDATE marker_photos
      SET
        \`markerId\`=${body.markerId},
        \`photo\`=${body.photo ? `'${body.photo}'` : 'NULL'},
        \`photoMini\`=${body.photoMini ? `'${body.photoMini}'` : 'NULL'}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IMarkerPhotosDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM marker_photos
      WHERE id = ${id}`);
    return record;
  }
}
