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
    if ('filter' in query) {
      filter += `WHERE ${query.filter}`;
    }
    let additional = filter;
    const isPagination = query.page && query.size;
    if (isPagination) {
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
        \`cityId\`
      FROM article ${additional}`);

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
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
    return (await this.connection.query(`
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
        \`cityId\`
      FROM article
      WHERE id = ${id}`))[0];
  }

  //putItem(id: TID): IArticleDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IArticleDTO {
  //  throw new Error('Method not implemented.');
  //}
}
