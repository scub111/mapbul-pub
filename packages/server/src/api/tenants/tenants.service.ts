import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { Pagination, ITenantDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class TenantsService extends BaseService<ITenantDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection({ ...GlobalVar.env.dbConnection, multipleStatements: true });
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(query: GetAllQueryDTO): Promise<Pagination<ITenantDTO>> {
    let additional = '';
    const isPagenation = query.page && query.limit;
    if (isPagenation) {
      const offset = (query.page - 1) * query.limit;
      additional = `limit ${offset},${query.limit}; SELECT count(*) FROM tenant`;
    }
    const records = await this.query(`
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
      data: isPagenation ? records[0] : records,
      totalPages: isPagenation ? Number(Math.ceil(records[1][0]['count(*)'] / query.limit)) : 1,
    };
  }

  postItem(item: ITenantDTO): Promise<ITenantDTO> {
    throw new Error('Method not implemented.');
  }

  putAll(item: ITenantDTO): ITenantDTO {
    throw new Error('Method not implemented.');
  }

  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  async getItem(id: TID): Promise<ITenantDTO> {
    return (await this.query(`
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

  putItem(id: TID): ITenantDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): ITenantDTO {
    throw new Error('Method not implemented.');
  }
}
