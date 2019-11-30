import { BaseService } from 'server/common/BaseService';
import { TID } from 'server/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IMarkerPhotosDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class MarkerPhotosService extends BaseService<IMarkerPhotosDTO> {
  constructor() {
    super();
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<IMarkerPhotosDTO>> {
    let additional = '';
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM marker_photos`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`markerId\`,
        \`photo\`,
        \`photoMini\`
      FROM marker_photos ${additional}`);

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
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
    return (await this.connection.query(`
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
