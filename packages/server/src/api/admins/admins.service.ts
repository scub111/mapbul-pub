import { BaseService } from 'server/common/BaseService';
import { TID } from 'server/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IAdminDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class AdminsService implements BaseService<IAdminDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<IAdminDTO>> {
    let additional = '';
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM admin`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`superuser\`
      FROM admin ${additional}`);

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  //postItem(item: IAdminDTO): Promise<IAdminDTO> {
  //  throw new Error('Method not implemented.');
  //}

  //putAll(item: IAdminDTO): IAdminDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IAdminDTO> {
    return (await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`superuser\`
      FROM admin
      WHERE id = ${id}`))[0];
  }

  //putItem(id: TID): IAdminDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IAdminDTO {
  //  throw new Error('Method not implemented.');
  //}
}
