import { BaseService } from 'server/common/BaseService';
import { TID } from 'server/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IWorkTimeDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class WorkTimesService extends BaseService<IWorkTimeDTO> {
  constructor() {
    super();
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<IWorkTimeDTO>> {
    let additional = '';
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM worktime`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`openTime\`,
        \`closeTime\`,
        \`markerId\`,
        \`weekDayId\`
      FROM worktime ${additional}`);

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  postItem(item: IWorkTimeDTO): Promise<IWorkTimeDTO> {
    throw new Error('Method not implemented.');
  }

  putAll(item: IWorkTimeDTO): IWorkTimeDTO {
    throw new Error('Method not implemented.');
  }

  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  async getItem(id: TID): Promise<IWorkTimeDTO> {
    return (await this.connection.query(`
      SELECT
        \`id\`,
        \`openTime\`,
        \`closeTime\`,
        \`markerId\`,
        \`weekDayId\`
      FROM worktime
      WHERE id = ${id}`))[0];
  }

  putItem(id: TID): IWorkTimeDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IWorkTimeDTO {
    throw new Error('Method not implemented.');
  }
}
