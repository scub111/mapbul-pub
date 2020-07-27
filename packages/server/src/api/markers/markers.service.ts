import { BaseService } from 'serverSrc/common/BaseService';
import { TID } from 'serverSrc/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IMarkerDTO, IGetAllQuery } from '@mapbul-pub/types';

export class MarkersService implements BaseService<IMarkerDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IMarkerDTO>> {
    let filter = '';
    if (query.filter) {
      filter += `WHERE ${query.filter}`;
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

    const totalElements = Number(records[1][0]['count(*)']);

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  //postItem(item: IMarkerDTO): Promise<IMarkerDTO> {
  //  throw new Error('Method not implemented.');
  //}

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

  //putItem(id: TID): IMarkerDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IMarkerDTO {
  //  throw new Error('Method not implemented.');
  //}
}
