import { BaseService } from 'serverSrc/common/BaseService';
import { TID } from 'serverSrc/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IDiscountDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'serverSrc/common/QueryDTO';

export class DiscountsService implements BaseService<IDiscountDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<IDiscountDTO>> {
    let additional = '';
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM discount`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`value\`
      FROM discount ${additional}`);

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  //postItem(item: IDiscountDTO): Promise<IDiscountDTO> {
  //  throw new Error('Method not implemented.');
  //}

  //putAll(item: IDiscountDTO): IDiscountDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IDiscountDTO> {
    return (await this.connection.query(`
      SELECT
        \`id\`,
        \`value\`
      FROM discount
      WHERE id = ${id}`))[0];
  }

  //putItem(id: TID): IDiscountDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IDiscountDTO {
  //  throw new Error('Method not implemented.');
  //}
}
