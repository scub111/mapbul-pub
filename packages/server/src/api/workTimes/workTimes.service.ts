import { BaseService, TID, IOkPacket } from 'common';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { dateTimeFormat } from '@mapbul-pub/utils';
import { IDbConnection, PageContent, IWorkTimeDTO, IGetAllQuery } from '@mapbul-pub/types';

export class WorkTimesService implements BaseService<IWorkTimeDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IWorkTimeDTO>> {
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

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IWorkTimeDTO): Promise<IWorkTimeDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO worktime
      (
        \`openTime\`,
        \`closeTime\`,
        \`markerId\`,
        \`weekDayId\`
      ) 
      Values 
      (
        '${dateTimeFormat(body.openTime)}',
        '${dateTimeFormat(body.closeTime)}',
        ${body.markerId},
        ${body.weekDayId}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: IWorkTimeDTO): IWorkTimeDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IWorkTimeDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`openTime\`,
        \`closeTime\`,
        \`markerId\`,
        \`weekDayId\`
      FROM worktime
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IWorkTimeDTO): Promise<IWorkTimeDTO> {
    await this.connection.query(
      `
      UPDATE worktime
      SET
        \`openTime\`='${dateTimeFormat(body.openTime)}',
        \`closeTime\`='${dateTimeFormat(body.closeTime)}',
        \`markerId\`=${body.markerId},
        \`weekDayId\`=${body.weekDayId}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IWorkTimeDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM worktime
      WHERE id = ${id}`);
    return record;
  }
}
