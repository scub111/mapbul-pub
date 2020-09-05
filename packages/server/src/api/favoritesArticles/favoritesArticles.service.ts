import { BaseService, TID, IOkPacket } from 'common';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IFavoritesArticleDTO, IGetAllQuery } from '@mapbul-pub/types';

export class FavoritesArticlesService implements BaseService<IFavoritesArticleDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IFavoritesArticleDTO>> {
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
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM favorites_article ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`articleId\`
      FROM favorites_article ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: IFavoritesArticleDTO): Promise<IFavoritesArticleDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO favorites_article
      (
        \`userId\`,
        \`articleId\`
      ) 
      Values 
      (
        ${body.userId},
        ${body.articleId}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: IFavoritesArticleDTO): IFavoritesArticleDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IFavoritesArticleDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`articleId\`
      FROM favorites_article
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: IFavoritesArticleDTO): Promise<IFavoritesArticleDTO> {
    await this.connection.query(
      `
      UPDATE favorites_article
      SET
        \`userId\`=${body.userId},
        \`articleId\`=${body.articleId}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<IFavoritesArticleDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM favorites_article
      WHERE id = ${id}`);
    return record;
  }
}
