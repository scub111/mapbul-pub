import { BaseService } from 'serverSrc/common/BaseService';
import { TID } from 'serverSrc/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IFavoritesArticleDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'serverSrc/common/QueryDTO';

export class FavoritesArticlesService implements BaseService<IFavoritesArticleDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<IFavoritesArticleDTO>> {
    let additional = '';
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM favorites_article`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`articleId\`
      FROM favorites_article ${additional}`);

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  //postItem(item: IFavoritesArticleDTO): Promise<IFavoritesArticleDTO> {
  //  throw new Error('Method not implemented.');
  //}

  //putAll(item: IFavoritesArticleDTO): IFavoritesArticleDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IFavoritesArticleDTO> {
    return (await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`articleId\`
      FROM favorites_article
      WHERE id = ${id}`))[0];
  }

  //putItem(id: TID): IFavoritesArticleDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IFavoritesArticleDTO {
  //  throw new Error('Method not implemented.');
  //}
}
