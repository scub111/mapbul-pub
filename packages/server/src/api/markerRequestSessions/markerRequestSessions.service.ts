import { IBaseService, TID, IOkPacket } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IMarkerRequestSessionDTO, IGetAllQuery } from '@mapbul-pub/types';

export class MarkerRequestSessionsService implements IBaseService<IMarkerRequestSessionDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IMarkerRequestSessionDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM marker_request_session ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`sessionId\`,
        \`markerId\`
      FROM marker_request_session ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IMarkerRequestSessionDTO): Promise<IMarkerRequestSessionDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO marker_request_session
      (
        \`sessionId\`,
        \`markerId\`
      ) 
      Values 
      (
        '${body.sessionId}',
        ${body.markerId}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: IMarkerRequestSessionDTO): IMarkerRequestSessionDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IMarkerRequestSessionDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`sessionId\`,
        \`markerId\`
      FROM marker_request_session
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IMarkerRequestSessionDTO): Promise<IMarkerRequestSessionDTO> {
    await this.connection.query(
      `
      UPDATE marker_request_session
      SET
        \`sessionId\`='${body.sessionId}',
        \`markerId\`=${body.markerId}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IMarkerRequestSessionDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM marker_request_session
      WHERE id = ${id}`);
    return record;
  }
}
