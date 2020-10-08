import { IBaseService, TID, IOkPacket } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IWeekDayDTO, IGetAllQuery } from '@mapbul-pub/types';

export class WeekDaysService implements IBaseService<IWeekDayDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IWeekDayDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM weekday ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`tag\`,
        \`description\`,
        \`descriptionEn\`
      FROM weekday ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IWeekDayDTO): Promise<IWeekDayDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO weekday
      (
        \`tag\`,
        \`description\`,
        \`descriptionEn\`
      ) 
      Values 
      (
        '${body.tag}',
        '${body.description}',
        ${body.descriptionEn ? `'${body.descriptionEn}'` : 'NULL'}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: IWeekDayDTO): IWeekDayDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IWeekDayDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`tag\`,
        \`description\`,
        \`descriptionEn\`
      FROM weekday
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IWeekDayDTO): Promise<IWeekDayDTO> {
    await this.connection.query(
      `
      UPDATE weekday
      SET
        \`tag\`='${body.tag}',
        \`description\`='${body.description}',
        \`descriptionEn\`=${body.descriptionEn ? `'${body.descriptionEn}'` : 'NULL'}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IWeekDayDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM weekday
      WHERE id = ${id}`);
    return record;
  }
}
