import { IBaseService, TID, IOkPacket } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { dateTimeFormat } from '@mapbul-pub/utils';
import { IDbConnection, PageContent, IGuideDTO, IGetAllQuery } from '@mapbul-pub/types';

export class GuidesService implements IBaseService<IGuideDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IGuideDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM guide ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`editorId\`,
        \`firstName\`,
        \`middleName\`,
        \`lastName\`,
        \`gender\`,
        \`phone\`,
        \`birthDate\`,
        \`address\`
      FROM guide ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IGuideDTO): Promise<IGuideDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO guide
      (
        \`userId\`,
        \`editorId\`,
        \`firstName\`,
        \`middleName\`,
        \`lastName\`,
        \`gender\`,
        \`phone\`,
        \`birthDate\`,
        \`address\`
      ) 
      Values 
      (
        ${body.userId},
        ${body.editorId ? `${body.editorId}` : 'NULL'},
        '${body.firstName}',
        '${body.middleName}',
        '${body.lastName}',
        '${body.gender}',
        '${body.phone}',
        '${dateTimeFormat(body.birthDate)}',
        '${body.address}'
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: IGuideDTO): IGuideDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IGuideDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`editorId\`,
        \`firstName\`,
        \`middleName\`,
        \`lastName\`,
        \`gender\`,
        \`phone\`,
        \`birthDate\`,
        \`address\`
      FROM guide
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IGuideDTO): Promise<IGuideDTO> {
    await this.connection.query(
      `
      UPDATE guide
      SET
        \`userId\`=${body.userId},
        \`editorId\`=${body.editorId ? `${body.editorId}` : 'NULL'},
        \`firstName\`='${body.firstName}',
        \`middleName\`='${body.middleName}',
        \`lastName\`='${body.lastName}',
        \`gender\`='${body.gender}',
        \`phone\`='${body.phone}',
        \`birthDate\`='${dateTimeFormat(body.birthDate)}',
        \`address\`='${body.address}'
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IGuideDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM guide
      WHERE id = ${id}`);
    return record;
  }
}
