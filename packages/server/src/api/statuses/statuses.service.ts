import { BaseService } from 'server/common/BaseService';
import { TID } from 'server/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IStatusDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class StatusesService extends BaseService<IStatusDTO> {
  constructor() {
    super();
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<IStatusDTO>> {
    let additional = '';
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM status`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`tag\`,
        \`description\`
      FROM status ${additional}`);

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  postItem(item: IStatusDTO): Promise<IStatusDTO> {
    throw new Error('Method not implemented.');
  }

  putAll(item: IStatusDTO): IStatusDTO {
    throw new Error('Method not implemented.');
  }

  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  async getItem(id: TID): Promise<IStatusDTO> {
    return (await this.connection.query(`
      SELECT
        \`id\`,
        \`tag\`,
        \`description\`
      FROM status
      WHERE id = ${id}`))[0];
  }

  putItem(id: TID): IStatusDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IStatusDTO {
    throw new Error('Method not implemented.');
  }
}
