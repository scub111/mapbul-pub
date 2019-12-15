import { BaseService } from 'server/common/BaseService';
import { TID } from 'server/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IArticleSubcategoryDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class ArticleSubcategoriesService implements BaseService<IArticleSubcategoryDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<IArticleSubcategoryDTO>> {
    let additional = '';
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM articlesubcategory`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`articleId\`,
        \`categoryId\`
      FROM articlesubcategory ${additional}`);

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  //postItem(item: IArticleSubcategoryDTO): Promise<IArticleSubcategoryDTO> {
  //  throw new Error('Method not implemented.');
  //}

  //putAll(item: IArticleSubcategoryDTO): IArticleSubcategoryDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IArticleSubcategoryDTO> {
    return (await this.connection.query(`
      SELECT
        \`id\`,
        \`articleId\`,
        \`categoryId\`
      FROM articlesubcategory
      WHERE id = ${id}`))[0];
  }

  //putItem(id: TID): IArticleSubcategoryDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IArticleSubcategoryDTO {
  //  throw new Error('Method not implemented.');
  //}
}
