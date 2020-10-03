import { IBaseService, TID, IOkPacket, IRequest } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { dateTimeFormat } from '@mapbul-pub/utils';
import { IDbConnection, PageContent, IMarkerDTO, IGetAllQuery } from '@mapbul-pub/types';

export class MarkersService implements IBaseService<IMarkerDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IMarkerDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM marker ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`name\`,
        \`nameEn\`,
        \`introduction\`,
        \`introductionEn\`,
        \`description\`,
        \`descriptionEn\`,
        \`cityId\`,
        \`baseCategoryId\`,
        \`lat\`,
        \`lng\`,
        \`entryTicket\`,
        \`discountId\`,
        \`street\`,
        \`house\`,
        \`buliding\`,
        \`floor\`,
        \`site\`,
        \`email\`,
        \`photo\`,
        \`userId\`,
        \`addedDate\`,
        \`publishedDate\`,
        \`checkDate\`,
        \`statusId\`,
        \`logo\`,
        \`wifi\`,
        \`personal\`
      FROM marker ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IMarkerDTO, req: IRequest): Promise<IMarkerDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO marker
      (
        \`name\`,
        \`nameEn\`,
        \`introduction\`,
        \`introductionEn\`,
        \`description\`,
        \`descriptionEn\`,
        \`cityId\`,
        \`baseCategoryId\`,
        \`lat\`,
        \`lng\`,
        \`entryTicket\`,
        \`discountId\`,
        \`street\`,
        \`house\`,
        \`buliding\`,
        \`floor\`,
        \`site\`,
        \`email\`,
        \`photo\`,
        \`userId\`,
        \`addedDate\`,
        \`publishedDate\`,
        \`checkDate\`,
        \`statusId\`,
        \`logo\`,
        \`wifi\`,
        \`personal\`
      ) 
      Values 
      (
        '${body.name}',
        '${body.nameEn}',
        '${body.introduction}',
        '${body.introductionEn}',
        '${body.description}',
        '${body.descriptionEn}',
        ${body.cityId},
        ${body.baseCategoryId},
        ${body.lat},
        ${body.lng},
        ${body.entryTicket ? `'${body.entryTicket}'` : 'NULL'},
        ${body.discountId},
        '${body.street}',
        '${body.house}',
        '${body.buliding}',
        ${body.floor ? `'${body.floor}'` : 'NULL'},
        '${body.site}',
        '${body.email}',
        '${body.photo}',
        ${req.user.id},
        '${dateTimeFormat(body.addedDate)}',
        ${body.publishedDate ? `'${dateTimeFormat(body.publishedDate)}'` : 'NULL'},
        '${dateTimeFormat(body.checkDate)}',
        ${body.statusId},
        '${body.logo}',
        ${body.wifi},
        ${body.personal}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: IMarkerDTO): IMarkerDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IMarkerDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`name\`,
        \`nameEn\`,
        \`introduction\`,
        \`introductionEn\`,
        \`description\`,
        \`descriptionEn\`,
        \`cityId\`,
        \`baseCategoryId\`,
        \`lat\`,
        \`lng\`,
        \`entryTicket\`,
        \`discountId\`,
        \`street\`,
        \`house\`,
        \`buliding\`,
        \`floor\`,
        \`site\`,
        \`email\`,
        \`photo\`,
        \`userId\`,
        \`addedDate\`,
        \`publishedDate\`,
        \`checkDate\`,
        \`statusId\`,
        \`logo\`,
        \`wifi\`,
        \`personal\`
      FROM marker
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IMarkerDTO): Promise<IMarkerDTO> {
    await this.connection.query(
      `
      UPDATE marker
      SET
        \`name\`='${body.name}',
        \`nameEn\`='${body.nameEn}',
        \`introduction\`='${body.introduction}',
        \`introductionEn\`='${body.introductionEn}',
        \`description\`='${body.description}',
        \`descriptionEn\`='${body.descriptionEn}',
        \`cityId\`=${body.cityId},
        \`baseCategoryId\`=${body.baseCategoryId},
        \`lat\`=${body.lat},
        \`lng\`=${body.lng},
        \`entryTicket\`='${body.entryTicket}',
        \`discountId\`=${body.discountId},
        \`street\`='${body.street}',
        \`house\`='${body.house}',
        \`buliding\`='${body.buliding}',
        \`floor\`='${body.floor}',
        \`site\`='${body.site}',
        \`email\`='${body.email}',
        \`photo\`='${body.photo}',
        \`userId\`=${body.userId},
        \`addedDate\`='${dateTimeFormat(body.addedDate)}',
        \`publishedDate\`='${dateTimeFormat(body.publishedDate)}',
        \`checkDate\`='${dateTimeFormat(body.checkDate)}',
        \`statusId\`=${body.statusId},
        \`logo\`='${body.logo}',
        \`wifi\`=${body.wifi},
        \`personal\`=${body.personal}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IMarkerDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM marker
      WHERE id = ${id}`);
    return record;
  }
}
