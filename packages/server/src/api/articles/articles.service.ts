import { BaseService } from 'serverSrc/common/BaseService';
import { TID } from 'serverSrc/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IArticleDTO, IGetAllQuery } from '@mapbul-pub/types';

export class ArticlesService implements BaseService<IArticleDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IArticleDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM article ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`title\`,
        \`titleEn\`,
        \`titlePhoto\`,
        \`photo\`,
        \`sourceUrl\`,
        \`sourceUrlEn\`,
        \`sourcePhoto\`,
        \`sourcePhotoEn\`,
        \`description\`,
        \`descriptionEn\`,
        \`text\`,
        \`textEn\`,
        \`authorId\`,
        \`editorId\`,
        \`addedDate\`,
        \`publishedDate\`,
        \`markerId\`,
        \`startDate\`,
        \`startTime\`,
        \`statusId\`,
        \`baseCategoryId\`,
        \`endDate\`,
        \`cityId\`,
        \`titlePhotoPreview\`,
        \`titlePhotoOriginal\`,
        \`photoOriginal\`
      FROM article ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  //postItem(item: IArticleDTO): Promise<IArticleDTO> {
  //  throw new Error('Method not implemented.');
  //}

  //putAll(item: IArticleDTO): IArticleDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IArticleDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`title\`,
        \`titleEn\`,
        \`titlePhoto\`,
        \`photo\`,
        \`sourceUrl\`,
        \`sourceUrlEn\`,
        \`sourcePhoto\`,
        \`sourcePhotoEn\`,
        \`description\`,
        \`descriptionEn\`,
        \`text\`,
        \`textEn\`,
        \`authorId\`,
        \`editorId\`,
        \`addedDate\`,
        \`publishedDate\`,
        \`markerId\`,
        \`startDate\`,
        \`startTime\`,
        \`statusId\`,
        \`baseCategoryId\`,
        \`endDate\`,
        \`cityId\`,
        \`titlePhotoPreview\`,
        \`titlePhotoOriginal\`,
        \`photoOriginal\`
      FROM article
      WHERE id = ${id}`)
    )[0];
  }

  //putItem(id: TID): IArticleDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IArticleDTO {
  //  throw new Error('Method not implemented.');
  //}
}
