import { BaseService } from 'serverSrc/common/BaseService';
import { TID } from 'serverSrc/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IMarkerRequestSessionDTO, IGetAllQuery } from '@mapbul-pub/types';

export class MarkerRequestSessionsService implements BaseService<IMarkerRequestSessionDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IMarkerRequestSessionDTO>> {
    let filter = '';
    if (query.filter) {
      filter += `WHERE ${query.filter}`;
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

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / (query?.size || 1))) : 1,
    };
  }

  //postItem(item: IMarkerRequestSessionDTO): Promise<IMarkerRequestSessionDTO> {
  //  throw new Error('Method not implemented.');
  //}

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

  //putItem(id: TID): IMarkerRequestSessionDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IMarkerRequestSessionDTO {
  //  throw new Error('Method not implemented.');
  //}
}
