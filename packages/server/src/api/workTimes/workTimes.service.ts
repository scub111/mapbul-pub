import { BaseService } from 'serverSrc/common/BaseService';
import { TID } from 'serverSrc/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IWorkTimeDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'serverSrc/common/QueryDTO';

export class WorkTimesService implements BaseService<IWorkTimeDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<IWorkTimeDTO>> {
    let filter = '';
    if ('filter' in query) {
      filter += `WHERE ${query['filter']}`;
    }
    let additional = filter;
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM worktime ${filter}`;
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

  //postItem(item: IWorkTimeDTO): Promise<IWorkTimeDTO> {
  //  throw new Error('Method not implemented.');
  //}

  //putAll(item: IWorkTimeDTO): IWorkTimeDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

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

  //putItem(id: TID): IWorkTimeDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IWorkTimeDTO {
  //  throw new Error('Method not implemented.');
  //}
}
