import { BaseService } from 'server/common/BaseService';
import { TID } from 'server/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IJournalistDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class JournalistsService implements BaseService<IJournalistDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<IJournalistDTO>> {
    let additional = '';
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM journalist`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`editorId\`,
        \`firstName\`,
        \`middleName\`,
        \`lastName\`,
        \`gender\`,
        \`phone\`,
        \`birthDate\`,
        \`address\`
      FROM journalist ${additional}`);

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  //postItem(item: IJournalistDTO): Promise<IJournalistDTO> {
  //  throw new Error('Method not implemented.');
  //}

  //putAll(item: IJournalistDTO): IJournalistDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IJournalistDTO> {
    return (await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`editorId\`,
        \`firstName\`,
        \`middleName\`,
        \`lastName\`,
        \`gender\`,
        \`phone\`,
        \`birthDate\`,
        \`address\`
      FROM journalist
      WHERE id = ${id}`))[0];
  }

  //putItem(id: TID): IJournalistDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IJournalistDTO {
  //  throw new Error('Method not implemented.');
  //}
}
