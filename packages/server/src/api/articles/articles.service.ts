import { IBaseService, TID, IOkPacket } from 'interfaces';
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

  async postItem(body: IArticleDTO): Promise<IArticleDTO> {
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
        '${body.titleEn}',
        '${body.titlePhoto}',
        '${body.photo}',
        '${body.sourceUrl}',
        '${body.sourceUrlEn}',
        '${body.sourcePhoto}',
        '${body.sourcePhotoEn}',
        '${body.description}',
        '${body.descriptionEn}',
        '${body.text}',
        '${body.textEn}',
        ${body.authorId},
        ${body.editorId},
        '${dateTimeFormat(body.addedDate)}',
        '${dateTimeFormat(body.publishedDate)}',
        ${body.markerId},
        '${dateTimeFormat(body.startDate)}',
        '${dateTimeFormat(body.startTime)}',
        ${body.statusId},
        ${body.baseCategoryId},
        '${dateTimeFormat(body.endDate)}',
        ${body.cityId},
        '${body.titlePhotoPreview}',
        '${body.titlePhotoOriginal}',
        '${body.photoOriginal}'
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

  async putItem(id: TID, body: IArticleDTO): Promise<IArticleDTO> {
    await this.connection.query(
      `
      UPDATE article
      SET
        \`title\`='${body.title}',
        \`titleEn\`='${body.titleEn}',
        \`titlePhoto\`='${body.titlePhoto}',
        \`photo\`='${body.photo}',
        \`sourceUrl\`='${body.sourceUrl}',
        \`sourceUrlEn\`='${body.sourceUrlEn}',
        \`sourcePhoto\`='${body.sourcePhoto}',
        \`sourcePhotoEn\`='${body.sourcePhotoEn}',
        \`description\`='${body.description}',
        \`descriptionEn\`='${body.descriptionEn}',
        \`text\`='${body.text}',
        \`textEn\`='${body.textEn}',
        \`authorId\`=${body.authorId},
        \`editorId\`=${body.editorId},
        \`addedDate\`='${dateTimeFormat(body.addedDate)}',
        \`publishedDate\`='${dateTimeFormat(body.publishedDate)}',
        \`markerId\`=${body.markerId},
        \`startDate\`='${dateTimeFormat(body.startDate)}',
        \`startTime\`='${dateTimeFormat(body.startTime)}',
        \`statusId\`=${body.statusId},
        \`baseCategoryId\`=${body.baseCategoryId},
        \`endDate\`='${dateTimeFormat(body.endDate)}',
        \`cityId\`=${body.cityId},
        \`titlePhotoPreview\`='${body.titlePhotoPreview}',
        \`titlePhotoOriginal\`='${body.titlePhotoOriginal}',
        \`photoOriginal\`='${body.photoOriginal}'
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
