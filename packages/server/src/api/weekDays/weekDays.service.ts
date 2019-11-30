import { BaseService } from 'server/common/BaseService';
import { TID } from 'server/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IWeekDayDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class WeekDaysService extends BaseService<IWeekDayDTO> {
  constructor() {
    super();
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<IWeekDayDTO>> {
    let additional = '';
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM weekday`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`tag\`,
        \`description\`,
        \`descriptionEn\`
      FROM weekday ${additional}`);

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  postItem(item: IWeekDayDTO): Promise<IWeekDayDTO> {
    throw new Error('Method not implemented.');
  }

  putAll(item: IWeekDayDTO): IWeekDayDTO {
    throw new Error('Method not implemented.');
  }

  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  async getItem(id: TID): Promise<IWeekDayDTO> {
    return (await this.connection.query(`
      SELECT
        \`id\`,
        \`tag\`,
        \`description\`,
        \`descriptionEn\`
      FROM weekday
      WHERE id = ${id}`))[0];
  }

  putItem(id: TID): IWeekDayDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IWeekDayDTO {
    throw new Error('Method not implemented.');
  }
}
