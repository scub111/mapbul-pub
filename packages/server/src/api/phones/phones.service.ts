import { BaseService } from 'serverSrc/common/BaseService';
import { TID } from 'serverSrc/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IPhoneDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'serverSrc/common/QueryDTO';

export class PhonesService implements BaseService<IPhoneDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<IPhoneDTO>> {
    let filter = '';
    if ('filter' in query) {
      filter += `WHERE ${query['filter']}`;
    }
    let additional = filter;
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM phone ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`number\`,
        \`markerId\`,
        \`primary\`
      FROM phone ${additional}`);

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  //postItem(item: IPhoneDTO): Promise<IPhoneDTO> {
  //  throw new Error('Method not implemented.');
  //}

  //putAll(item: IPhoneDTO): IPhoneDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IPhoneDTO> {
    return (await this.connection.query(`
      SELECT
        \`id\`,
        \`number\`,
        \`markerId\`,
        \`primary\`
      FROM phone
      WHERE id = ${id}`))[0];
  }

  //putItem(id: TID): IPhoneDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IPhoneDTO {
  //  throw new Error('Method not implemented.');
  //}
}
