import { BaseService } from 'serverSrc/common/BaseService';
import { TID } from 'serverSrc/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IUserTypeDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'serverSrc/common/QueryDTO';

export class UserTypesService implements BaseService<IUserTypeDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: GetAllQueryDTO): Promise<PageContent<IUserTypeDTO>> {
    let additional = '';
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM usertype`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`tag\`,
        \`description\`
      FROM usertype ${additional}`);

    return {
      content: isPagination ? records[0] : records,
      totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  //postItem(item: IUserTypeDTO): Promise<IUserTypeDTO> {
  //  throw new Error('Method not implemented.');
  //}

  //putAll(item: IUserTypeDTO): IUserTypeDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IUserTypeDTO> {
    return (await this.connection.query(`
      SELECT
        \`id\`,
        \`tag\`,
        \`description\`
      FROM usertype
      WHERE id = ${id}`))[0];
  }

  //putItem(id: TID): IUserTypeDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IUserTypeDTO {
  //  throw new Error('Method not implemented.');
  //}
}
