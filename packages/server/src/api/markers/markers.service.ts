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
        ${body.nameEn ? `'${body.nameEn}'` : 'NULL'},
        '${body.introduction}',
        ${body.introductionEn ? `'${body.introductionEn}'` : 'NULL'},
        '${body.description}',
        ${body.descriptionEn ? `'${body.descriptionEn}'` : 'NULL'},
        ${body.cityId},
        ${body.baseCategoryId},
        ${body.lat},
        ${body.lng},
        ${body.entryTicket ? `'${body.entryTicket}'` : 'NULL'},
        ${body.discountId},
        '${body.street}',
        '${body.house}',
        ${body.buliding ? `'${body.buliding}'` : 'NULL'},
        ${body.floor ? `'${body.floor}'` : 'NULL'},
        ${body.site ? `'${body.site}'` : 'NULL'},
        ${body.email ? `'${body.email}'` : 'NULL'},
        ${body.photo ? `'${body.photo}'` : 'NULL'},
        ${req.user.id},
        '${dateTimeFormat(body.addedDate)}',
        ${body.publishedDate ? `'${dateTimeFormat(body.publishedDate)}'` : 'NULL'},
        ${body.checkDate ? `'${dateTimeFormat(body.checkDate)}'` : 'NULL'},
        ${body.statusId},
        ${body.logo ? `'${body.logo}'` : 'NULL'},
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

  async putItem(id: TID, body: IMarkerDTO, req: IRequest): Promise<IMarkerDTO> {
    await this.connection.query(
      `
      UPDATE marker
      SET
        \`name\`='${body.name}',
        \`nameEn\`=${body.nameEn ? `'${body.nameEn}'` : 'NULL'},
        \`introduction\`='${body.introduction}',
        \`introductionEn\`=${body.introductionEn ? `'${body.introductionEn}'` : 'NULL'},
        \`description\`='${body.description}',
        \`descriptionEn\`=${body.descriptionEn ? `'${body.descriptionEn}'` : 'NULL'},
        \`cityId\`=${body.cityId},
        \`baseCategoryId\`=${body.baseCategoryId},
        \`lat\`=${body.lat},
        \`lng\`=${body.lng},
        \`entryTicket\`=${body.entryTicket ? `'${body.entryTicket}'` : 'NULL'},
        \`discountId\`=${body.discountId},
        \`street\`='${body.street}',
        \`house\`='${body.house}',
        \`buliding\`=${body.buliding ? `'${body.buliding}'` : 'NULL'},
        \`floor\`=${body.floor ? `'${body.floor}'` : 'NULL'},
        \`site\`=${body.site ? `'${body.site}'` : 'NULL'},
        \`email\`=${body.email ? `'${body.email}'` : 'NULL'},
        \`photo\`=${body.photo ? `'${body.photo}'` : 'NULL'},
        \`userId\`=${req.user.id},
        \`addedDate\`='${dateTimeFormat(body.addedDate)}',
        \`publishedDate\`=${
          body.publishedDate ? `'${dateTimeFormat(body.publishedDate)}'` : 'NULL'
        },
        \`checkDate\`=${body.checkDate ? `'${dateTimeFormat(body.checkDate)}'` : 'NULL'},
        \`statusId\`=${body.statusId},
        \`logo\`=${body.logo ? `'${body.logo}'` : 'NULL'},
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
