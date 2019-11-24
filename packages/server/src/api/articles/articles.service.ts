import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { Pagination, IArticleDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class ArticlesService extends BaseService<IArticleDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection({ ...GlobalVar.env.dbConnection, multipleStatements: true });
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(query: GetAllQueryDTO): Promise<Pagination<IArticleDTO>> {
    let additional = '';
    const isPagenation = query.page && query.size;
    if (isPagenation) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM article`;
    }
    const records = await this.query(`
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
      content: isPagenation ? records[0] : records,
      totalPages: isPagenation ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  postItem(item: IArticleDTO): Promise<IArticleDTO> {
    throw new Error('Method not implemented.');
  }

  putAll(item: IArticleDTO): IArticleDTO {
    throw new Error('Method not implemented.');
  }

  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  async getItem(id: TID): Promise<IArticleDTO> {
    return (await this.query(`
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

  putItem(id: TID): IArticleDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IArticleDTO {
    throw new Error('Method not implemented.');
  }
}
