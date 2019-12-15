import { BaseService } from 'server/common/BaseService';
import { TID } from 'server/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, ITenantDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class TenantsService implements BaseService<ITenantDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<ITenantDTO>> {
    let additional = '';
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM tenant`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`firstName\`,
        \`middleName\`,
        \`lastName\`,
        \`gender\`,
        \`phone\`,
        \`birthDate\`,
        \`address\`
      FROM tenant ${additional}`);

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  //postItem(item: ITenantDTO): Promise<ITenantDTO> {
  //  throw new Error('Method not implemented.');
  //}

  //putAll(item: ITenantDTO): ITenantDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<ITenantDTO> {
    return (await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`firstName\`,
        \`middleName\`,
        \`lastName\`,
        \`gender\`,
        \`phone\`,
        \`birthDate\`,
        \`address\`
      FROM tenant
      WHERE id = ${id}`))[0];
  }

  //putItem(id: TID): ITenantDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): ITenantDTO {
  //  throw new Error('Method not implemented.');
  //}
}
