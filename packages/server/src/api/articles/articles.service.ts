import { IBaseService, TID, IOkPacket, IRequest } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { dateTimeFormat } from '@mapbul-pub/utils';
import { IDbConnection, PageContent, IArticleDTO, IGetAllQuery } from '@mapbul-pub/types';

export class ArticlesService implements IBaseService<IArticleDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IArticleDTO>> {
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

  async postItem(body: IArticleDTO, req: IRequest): Promise<IArticleDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO article
      (
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
      ) 
      Values 
      (
        '${body.title}',
        ${body.titleEn ? `'${body.titleEn}'` : 'NULL'},
        ${body.titlePhoto ? `'${body.titlePhoto}'` : 'NULL'},
        ${body.photo ? `'${body.photo}'` : 'NULL'},
        ${body.sourceUrl ? `'${body.sourceUrl}'` : 'NULL'},
        ${body.sourceUrlEn ? `'${body.sourceUrlEn}'` : 'NULL'},
        ${body.sourcePhoto ? `'${body.sourcePhoto}'` : 'NULL'},
        ${body.sourcePhotoEn ? `'${body.sourcePhotoEn}'` : 'NULL'},
        '${body.description}',
        ${body.descriptionEn ? `'${body.descriptionEn}'` : 'NULL'},
        '${body.text}',
        ${body.textEn ? `'${body.textEn}'` : 'NULL'},
        ${req.user.id},
        ${body.editorId ? `${body.editorId}` : 'NULL'},
        '${dateTimeFormat(body.addedDate)}',
        ${body.publishedDate ? `'${dateTimeFormat(body.publishedDate)}'` : 'NULL'},
        ${body.markerId ? `${body.markerId}` : 'NULL'},
        ${body.startDate ? `'${dateTimeFormat(body.startDate)}'` : 'NULL'},
        ${body.startTime ? `'${dateTimeFormat(body.startTime)}'` : 'NULL'},
        ${body.statusId},
        ${body.baseCategoryId},
        ${body.endDate ? `'${dateTimeFormat(body.endDate)}'` : 'NULL'},
        ${body.cityId ? `${body.cityId}` : 'NULL'},
        ${body.titlePhotoPreview ? `'${body.titlePhotoPreview}'` : 'NULL'},
        ${body.titlePhotoOriginal ? `'${body.titlePhotoOriginal}'` : 'NULL'},
        ${body.photoOriginal ? `'${body.photoOriginal}'` : 'NULL'}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

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

  async putItem(id: TID, body: IArticleDTO, req: IRequest): Promise<IArticleDTO> {
    await this.connection.query(
      `
      UPDATE article
      SET
        \`title\`='${body.title}',
        \`titleEn\`=${body.titleEn ? `'${body.titleEn}'` : 'NULL'},
        \`titlePhoto\`=${body.titlePhoto ? `'${body.titlePhoto}'` : 'NULL'},
        \`photo\`=${body.photo ? `'${body.photo}'` : 'NULL'},
        \`sourceUrl\`=${body.sourceUrl ? `'${body.sourceUrl}'` : 'NULL'},
        \`sourceUrlEn\`=${body.sourceUrlEn ? `'${body.sourceUrlEn}'` : 'NULL'},
        \`sourcePhoto\`=${body.sourcePhoto ? `'${body.sourcePhoto}'` : 'NULL'},
        \`sourcePhotoEn\`=${body.sourcePhotoEn ? `'${body.sourcePhotoEn}'` : 'NULL'},
        \`description\`='${body.description}',
        \`descriptionEn\`=${body.descriptionEn ? `'${body.descriptionEn}'` : 'NULL'},
        \`text\`='${body.text}',
        \`textEn\`=${body.textEn ? `'${body.textEn}'` : 'NULL'},
        \`authorId\`=${req.user.id},
        \`editorId\`=${body.editorId ? `${body.editorId}` : 'NULL'},
        \`addedDate\`='${dateTimeFormat(body.addedDate)}',
        \`publishedDate\`=${body.publishedDate ? `'${dateTimeFormat(body.publishedDate)}'` : 'NULL'},
        \`markerId\`=${body.markerId ? `${body.markerId}` : 'NULL'},
        \`startDate\`=${body.startDate ? `'${dateTimeFormat(body.startDate)}'` : 'NULL'},
        \`startTime\`=${body.startTime ? `'${dateTimeFormat(body.startTime)}'` : 'NULL'},
        \`statusId\`=${body.statusId},
        \`baseCategoryId\`=${body.baseCategoryId},
        \`endDate\`=${body.endDate ? `'${dateTimeFormat(body.endDate)}'` : 'NULL'},
        \`cityId\`=${body.cityId ? `${body.cityId}` : 'NULL'},
        \`titlePhotoPreview\`=${body.titlePhotoPreview ? `'${body.titlePhotoPreview}'` : 'NULL'},
        \`titlePhotoOriginal\`=${body.titlePhotoOriginal ? `'${body.titlePhotoOriginal}'` : 'NULL'},
        \`photoOriginal\`=${body.photoOriginal ? `'${body.photoOriginal}'` : 'NULL'}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IArticleDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM article
      WHERE id = ${id}`);
    return record;
  }
}
